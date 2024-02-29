const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerZonasCobertura, normalizeString, obtenerPlanPorId, obtenerPlanesInternet } = require("../../services/web.service");
const { crearMensajeConBotones } = require("../../services/generic.service");

let nombre, telefono, localidad, paquete, ubicacion;

let botones = [
    { textoBoton: '❌ Cancelar proceso' }
];

const flowContratacion = addKeyword(['b', '3'], { sensitive: true })
    .addAnswer(
        [
            '🤖 Te solicitaré un par de datos necesarios para poder continuar con este proceso'
        ],
        null,
        async ({ from }) => {
            return await crearMensajeConBotones(from, '🤖 ¿Cúal es tú nombre?', botones);
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

            await flowDynamic('Mucho gusto ' + nombre + ', continuemos...');
            await crearMensajeConBotones(telefono, '🤖 ¿Cuál es la localidad en donde vive?', botones);
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
            if (ctx.body == '❌ Cancelar proceso') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const input = normalizeString(ctx.body);

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
                await crearMensajeConBotones(ctx.from, '🤖 ¿Cuál es la localidad en donde vive?', botones);
            }

            if (coberturas.responseType == 1) {
                localidad = coberturas.comunidad;
                const planes = await obtenerPlanesInternet();
                await flowDynamic([
                    'Excelente, en ' + localidad + ' contamos con cobertura\n\n🤖 Ahora, te comparto los planes con los que contamos actualmente:',
                    planes
                ]);
                return await crearMensajeConBotones(ctx.from, '🤖 ¿Cuál es el plan que te interesa más?', botones);
            }

            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            if (ctx.body == '❌ Cancelar proceso') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const input = normalizeString(ctx.body);

            if (isNaN(input)) {
                await flowDynamic('Se debe colocar una opción válida');
                await crearMensajeConBotones(ctx.from, '🤖 ¿Qué plan te interesa más?', botones);
            } else {
                const plan = await obtenerPlanPorId(input);

                if (!plan) {
                    await flowDynamic('No se encontró ningún plan con ese identificador.\nPor favor, introduce un identificador válido.');
                    await crearMensajeConBotones(ctx.from, '🤖 ¿Qué plan te interesa más?', botones);
                } else {
                    paquete = plan;
                    await flowDynamic(plan);
                    return await crearMensajeConBotones(ctx.from, '🤖 Ahora, ¿Podrías compartirme tu ubicación actual/fija?\n*(NOTA: UBICACIÓN ACTUAL/FIJA, NO EN TIEMPO REAL)* 🌎\nEsto con el fin de ubicar exactamente tu domicilio', [
                        { textoBoton: '🌎 No me encuentro en mi domicilio' },
                        ...botones
                    ]);
                }
            }

            return fallBack();
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            if (ctx.body == '❌ Cancelar proceso') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            if (ctx.body == '🌎 No me encuentro en mi domicilio') {
                await flowDynamic([
                    'De acuerdo, dejaremos esto para más tarde\n\n📑 A continuación te comparto un resumen de la información compartida:',
                    `*Nombre*:\n    👤 ${nombre}\n\n*Localidad*:\n    📍 ${localidad}\n\n${paquete}`
                ]);

                return await crearMensajeConBotones(ctx.from, '🤖 ¿La información es la correcta?', [
                    { textoBoton: '✔️ Continuar con el proceso' },
                    { textoBoton: '❌ Cancelar proceso' }
                ]);
            }

            const coordenadas = ctx.message.locationMessage;

            if (coordenadas) {
                ubicacion = {
                    lat: coordenadas.degreesLatitude,
                    long: coordenadas.degreesLongitude
                };
                await flowDynamic([
                    'Gracias por compartirnos tu ubicación...',
                    '📑 A continuación te comparto un resumen de la información compartida:',
                    `*Nombre*:\n    - ${nombre}\n\n*Localidad*:\n    - ${localidad}\n\n${paquete}`
                ]);

                return await crearMensajeConBotones(ctx.from, '🤖 ¿La información es la correcta?', [
                    { textoBoton: '✔️ Continuar con el proceso' },
                    { textoBoton: '❌ Cancelar proceso' }
                ]);
            }

            await crearMensajeConBotones(ctx.from, 'No es lo que se esperaba.\n\n¿Podría compartirnos su ubicación actual/fija?\nEsto con el fin de ubicar exactamente tu domicilio', [
                { textoBoton: '🌎 No me encuentro en mi domicilio' },
                ...botones
            ]);
            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow, fallBack }) => {
            if (body == '✔️ Continuar con el proceso') {
                return flowDynamic([
                    '🤖 Muy bien, gracias por apoyarnos con tu información\n\nRecuerde que para confirmar 100% la cobertura en su domicilio es necesario el estudio que realizará el asesor',
                    'En los próximos minutos uno de nuestros asesores 🧑🏻‍💻 se podrá en contacto contigo para concluir con este proceso, por favor espere...'
                ]);
            }

            if (body == '❌ Cancelar proceso') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            await flowDynamic('Se debe colocar una opción válida');
            return fallBack();
        }
    )

module.exports = { flowContratacion };