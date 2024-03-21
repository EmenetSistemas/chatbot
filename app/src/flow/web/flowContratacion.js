const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerZonasCobertura, normalizeString, obtenerPlanPorIdentificador, obtenerPlanesInternetTipo } = require("../../services/web.service");
const { registrarSolicitudInstalacion } = require("../../services/client.service");

let nombre, telefono, localidad, paquete, ubicacion, caracteristicasDomicilio, detallePaquete;

const flowContratacion = addKeyword(['3', 'contratacion', 'internet'], { sensitive: true })
    .addAction(
        async (ctx, { provider }) => {
            const abc = await provider.getInstance();
            await abc.chatModify({ archive: false, lastMessages: [ctx] }, ctx.key.remoteJid);
        }
    )
    .addAnswer(
        [
            '🤖 Te solicitaré un par de datos necesarios para poder continuar con este proceso',
            '',
            '❌ Si deseas cancelar o salir de este proceso lo puedes realizar en cualquier momento colocando la palabra *cancelar*'
        ]
    )
    .addAnswer(
        '🤖 ¿Cúal es tú nombre completo?',
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            const input = normalizeString(ctx.body);

            if (input == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            if (input.split(' ').length <= 2) {
                await flowDynamic('Se debe colocar nombre completo');
                return await fallBack();
            }

            nombre = ctx.body;
            telefono = ctx.from;

            await flowDynamic('Mucho gusto *' + nombre + '*, continuemos...');
            return await flowDynamic('🤖 ¿Cuál es la localidad en donde vive?');
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
            const input = normalizeString(ctx.body);

            if (ctx.body == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const coberturas = await obtenerZonasCobertura(input);

            if (coberturas.responseType == 3) {
                await flowDynamic([
                    'No indetifico tú localidad, puedes intentar de nuevo verificando errores de escritura'
                ]);
            }

            if (coberturas.responseType == 2) {
                await flowDynamic([
                    'No indetifico tú localidad, pero encontre localidades similares.\nPuedes colocar de nuevo tú la localidad si es que se encuentra en el siguiente listado:',
                    coberturas.mensaje
                ]);
            }

            if (coberturas.responseType == 1) {
                localidad = coberturas.comunidad;
                return await flowDynamic([
                    '✔️ Excelente, en *' + localidad + '* contamos con cobertura 🛜\n\n🤖 Ahora, te comparto los planes con los que contamos actualmente:',
                    '🤖 En Emenet Comunicaciones contamos con planes mensuales y planes anuales, cada uno con ventajas diferentes según tus necesidades ¿Cuál te interesa más?\n\n   *1.* Planes mensuales\n   *2.* Planes anuales'
                ]);
            }

            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, fallBack, gotoFlow }) => {
            if (body == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            tipoPlanes = body;
            if (body == 1) {
                const planes = await obtenerPlanesInternetTipo('mensual');
                await flowDynamic('🤖 Los planes mensuales de emenet proporcionan flexibilidad y son ideales para compromisos a corto plazo o para probar servicios sin una gran inversión inicial');
                return await flowDynamic([
                    ...planes,
                    '🤖 ¿Qué plan te interesa más?'
                ]);
            } else if (body == 2) {
                const planes = await obtenerPlanesInternetTipo('anual');
                await flowDynamic('🤖 Los planes anuales de emenet ofrecen ahorro, estabilidad y soporte continuo, ideales para quienes buscan una solución económica 💵 y confiable a largo plazo');
                return await flowDynamic([
                    ...planes,
                    '🤖 ¿Qué plan te interesa más?'
                ]);
            }

            await flowDynamic('Se debe colocar una opción valida');
            return fallBack();
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow, fallBack }) => {
            if (body == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const input = normalizeString(body);

            if (!isNaN(input)) {
                const plan = await obtenerPlanPorIdentificador(tipoPlanes, input);

                if (plan) {
                    paquete = plan.pkTblPlan;
                    detallePaquete = plan.mensaje;

                    return await flowDynamic([
                        plan.mensaje,
                        '🤖 Ahora, ¿Podrías compartirnos tu ubicación actual/fija?\n\n*(NOTA: UBICACIÓN ACTUAL/FIJA, NO EN TIEMPO REAL)* 🌎\n\n*X* Si no se encuentra en su domicilio o no tiene forma de enviar la ubicación'
                    ]);
                }
            }

            await flowDynamic([
                'No se encontró ningún plan con ese identificador.\nPor favor, introduce un identificador válido',
                '🤖 ¿Qué plan te interesa más?'
            ]);

            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            const input = normalizeString(ctx.body);

            if (input == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            if (input == 'x') {
                return await flowDynamic('De acuerdo, dejaremos esto para más tarde\n\n🤖 Ahora, ¿pordrías compartirme algunas referencias/características de tu domicilio? 📑, para poder identificarlo mejor');
            }

            if (ctx.body.includes('http') && ctx.body.includes('maps')) {
                ubicacion = ctx.body;

                return await flowDynamic([
                    'Gracias por compartirnos tu ubicación...',
                    '🤖 Ahora, ¿pordrías compartirme algunas referencias/características de tu domicilio? 📑, para poder identificarlo mejor'
                ]);
            }

            const coordenadas = ctx.message.locationMessage;

            if (coordenadas) {
                ubicacion = `https://www.google.es/maps?q=${coordenadas.degreesLatitude}, ${coordenadas.degreesLongitude}`;

                return await flowDynamic([
                    'Gracias por compartirnos tu ubicación...',
                    '🤖 Ahora, ¿pordrías compartirme algunas referencias/características de tu domicilio? 📑, para poder identificarlo mejor'
                ]);
            }

            await flowDynamic('No es lo que se esperaba.\n\n¿Podrías compartirnos tu ubicación actual/fija?\n\n*(NOTA: UBICACIÓN ACTUAL/FIJA, NO EN TIEMPO REAL)* 🌎\n\n*X* Si no se encuentra en su domicilio o no tiene forma de enviar la ubicación');
            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow }) => {
            const input = normalizeString(body);

            if (input == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            caracteristicasDomicilio = body;
            const mensaje = ubicacion ?
                `*Nombre*:\n    👤 ${nombre}\n\n*Localidad*:\n    📍 ${localidad}\n\n*Domicilio*:\n🧭 ${ubicacion}\n\n*Características*:\n\n${caracteristicasDomicilio}\n\n${detallePaquete}` :
                `*Nombre*:\n    👤 ${nombre}\n\n*Localidad*:\n    📍 ${localidad}\n\n*Características*: 📑\n\n${caracteristicasDomicilio}\n\n${detallePaquete}`;

            return await flowDynamic([
                '🤖 A continuación te comparto un resumen de la información compartida:',
                mensaje,
                '🤖 ¿La información es la correcta?\n\n    a. Continuar con el proceso ✔️\n    b. Cancelar proceso ❌'
            ]);
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow, fallBack }) => {
            const input = normalizeString(body);
            if (input != 'a' && input != 'b') {
                await flowDynamic([
                    'Se debe colocar una opción válida',
                    '🤖 ¿La información es la correcta?\n\n    a. Continuar con el proceso ✔️\n    b. Cancelar proceso ❌'
                ]);
                return fallBack();
            }

            if (input == 'b') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const solicitud = {
                nombre,
                telefono,
                localidad,
                paquete,
                ubicacion,
                caracteristicasDomicilio
            };
            const errorPeticion = await registrarSolicitudInstalacion(solicitud);

            if (errorPeticion) {
                await flowDynamic('Upss...! Ocurrio un error inesperado, por favor apoyanos repitiendo el proceso');
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            return flowDynamic([
                '🤖 Muy bien, gracias por apoyarnos con tu información\n\nRecuerde que para confirmar 100% la cobertura en su domicilio es necesario el estudio que realizará el asesor',
                'Uno de nuestros asesores 🧑🏻‍💻 se podrá en contacto contigo lo antes posible para concluir con este proceso, por favor este al pendiente de este chat...\n\n    *0.* Si desea ver las opciones de nuevo para atender un asunto diferente mientras espera 🕑'
            ]);
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, fallBack, endFlow }) => {
            if (body == '0') {
                return await endFlow();
            }

            await flowDynamic('🧑🏻‍💻 Por favor espere, nos encontramos trabajando para poder atenderle lo antes posible...\n\n    *0.* Si desea ver las opciones de nuevo para atender un asunto diferente mientras espera 🕑');
            return await fallBack();
        }
    )

module.exports = { flowContratacion };