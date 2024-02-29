const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerZonasCobertura, normalizeString, obtenerPlanPorId, obtenerPlanesInternet } = require("../../services/web.service");
const { crearMensajeConBotones } = require("../../services/generic.service");

let nombre, telefono, localidad, paquete, ubicacion;

const textoPrincipal = '🤖 ¿Cuál es tu nombre?';
const botones = [
    { textoBoton: '❌ Cancelar proceso' }
];

const flowContratacion = addKeyword(['b', '3'], { sensitive: true })
    .addAnswer([
        '🤖 Te solicitaré un par de datos necesarios para poder continuar con este proceso',
        '',
        '❌ Si deseas cancelar este proceso lo puedes hacer en cualquier momento escribiendo la palabra *cancelar*'
    ])
    .addAction(
        async ({ from }) => {
            await crearMensajeConBotones(from, textoPrincipal, botones)
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow }) => {
            if (ctx.body == '❌ Cancelar proceso') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            nombre = ctx.body;
            telefono = ctx.from;

            return await flowDynamic('Mucho gusto ' + nombre + ', continuemos...');
        }
    )
    .addAction(
        async ({ from }) => {
            await crearMensajeConBotones(from, textoPrincipal, botones)
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, fallBack, gotoFlow }) => {
            if (body == '❌ Cancelar proceso') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const input = normalizeString(body);

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
                const planes = await obtenerPlanesInternet();
                return await flowDynamic([
                    'Excelente, en ' + localidad + ' contamos con cobertura',
                    '🤖 ¿Cuál es el plan que te interesa más?',
                    planes
                ]);
            }

            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
            if (body == '❌ Cancelar proceso') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const input = normalizeString(body);

            if (isNaN(input)) {
                await flowDynamic([
                    'Se debe colocar una opción válida',
                    '🤖 ¿Qué plan te interesa más?'
                ]);
            } else {
                const plan = await obtenerPlanPorId(input);

                if (!plan) {
                    await flowDynamic([
                        'No se encontró ningún plan con ese identificador.\nPor favor, introduce un identificador válido.',
                        '🤖 ¿Qué plan te interesa más?'
                    ]);
                } else {
                    paquete = plan;
                    return await flowDynamic([
                        plan,
                        '🤖 Ahora, ¿Podrías compartirme tu ubicación actual/fija? 🌐\n*(NOTA: UBICACIÓN ACTUAL/FIJA, NO EN TIEMPO REAL)*\nEsto con el fin de ubicar exactamente tu domicilio'
                    ]);
                }
            }

            return fallBack();
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, fallBack }) => {
            if (body == '❌ Cancelar proceso') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const coordenadas = ctx.message.locationMessage;

            if (coordenadas) {
                ubicacion = {
                    lat: coordenadas.degreesLatitude,
                    long: coordenadas.degreesLongitude
                };
                return await flowDynamic([
                    'Gracias por compartirnos tu ubicación...',
                    '📑 A continuación te comparto un resumen de la información compartida:',
                    `*Nombre*:\n    - ${nombre}\n\n*Localidad*:\n    - ${localidad}\n\n${paquete}`,
                    '🤖 ¿La información es la correcta?\n\n    a. Continuar con el proceso\n    b. Cancelar el proceso'
                ])
            }

            await flowDynamic('No es lo que se esperaba.\n\n¿Podría compartirnos su ubicación actual/fija?\nEsto con el fin de ubicar exactamente tu domicilio')
            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow }) => {
            if (body == 'a') {
                return flowDynamic([
                    'Muy bien, gracias por apoyarnos con tu información\nRecuerde que para confirmar 100% la cobertura en su domicilio es necesario el estudio que realizará el asesor',
                    'En los proximos minutos uno de nuestros asesores se podrá en contacto contigo para concluir con el proceso'
                ]);
            }

            if (body == 'b') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }
        }
    )

module.exports = { flowContratacion };