const { addKeyword } = require("@bot-whatsapp/bot");
const { obtenerZonasCobertura, normalizeString, obtenerPlanPorId, obtenerPlanesInternet } = require("../../services/web.service");

let nombre, telefono, localidad, paquete, ubicacion;

const flowContratacion = addKeyword('3', { sensitive: true })
    .addAnswer([
        'Te solicitaré un par de datos necesarios para poder continuar con este proceso',
        '',
        '❌ Si deseas cancelar este proceso lo puedes hacer en cualquier momento escribiendo la palabra *cancelar*'
    ])
    .addAnswer(
        '¿Cúal es tú nombre?',
        { capture: true },
        async (ctx, { flowDynamic }) => {
            nombre = ctx.body;
            telefono = ctx.from;

            await flowDynamic('Mucho gusto ' + nombre + ', continuemos...');
        }
    )
    .addAnswer(
        '¿Cuál es la localidad en donde vive?',
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
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
                    '¿Cuál es el plan que te interesa más?',
                    planes
                ]);
            }

            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
            const input = normalizeString(body);

            if (isNaN(input)) {
                await flowDynamic([
                    'Se debe colocar una opción válida',
                    '¿Qué plan te interesa más?'
                ]);
            } else {
                const plan = await obtenerPlanPorId(input);

                if (!plan) {
                    await flowDynamic([
                        'No se encontró ningún plan con ese identificador.\nPor favor, introduce un identificador válido.',
                        '¿Qué plan te interesa más?'
                    ]);
                } else {
                    paquete = input;
                    return await flowDynamic([
                        'A continuación te muestro un resumen del plan que elegiste',
                        plan,
                        'Ahora, ¿Podrías compartirme tu ubicación actual/fija? *(NOTA: UBICACIÓN ACTUAL/FIJA, NO EN TIEMPO REAL)*\nEsto con el fin de ubicar exactamente tu domicilio'
                    ]);
                }
            }

            return fallBack();
        }
    )
    .addAction(
        { capture: true },
        async (ctx, {flowDynamic, fallBack}) => {
            const coordenadas = ctx.message.locationMessage;
            if (coordenadas) {
                await flowDynamic('Gracias por compartirnos tu ubicación, estamos por terminar')
            } else {
                await flowDynamic('No es lo que se esperaba.\n\n¿Podría compartirnos su ubicación actual/fija?\nEsto con el fin de ubicar exactamente tu domicilio')
                return await fallBack();
            }
        }
    )

module.exports = { flowContratacion };