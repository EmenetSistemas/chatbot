const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerPlanesInternet, obtenerPlanPorId, normalizeString, obtenerPlanesInternetTipo, obtenerPlanPorIdentificador } = require("../../services/web.service");

let tipoPlanes;

const flowConsultaPlanes1 = addKeyword(['1', 'planes'], { sensitive: true })
    .addAnswer(
        '🛜 Los planes/paquetes de internet con los que contamos actualmente, son los siguientes:',
        null,
        async (_, { flowDynamic }) => {
            return await flowDynamic(await obtenerPlanesInternet());
        }
    )
    .addAnswer(
        '🤖 ¿Qué plan te interesa más?',
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            if (ctx.body == '📋 Volver al menú principal') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const input = normalizeString(ctx.body);

            if (isNaN(input)) {
                await flowDynamic('Se debe colocar una opción válida');
            } else {
                const plan = await obtenerPlanPorId(input);

                if (!plan) {
                    await flowDynamic('No se encontró ningún plan con ese identificador.\nPor favor, introduce un identificador válido.');
                } else {
                    await flowDynamic(plan.mensaje);

                    const { flowSecundario } = require("../start/flowSecundario");
                    return await gotoFlow(flowSecundario);
                }
            }

            return fallBack();
        }
    )

const flowConsultaPlanes = addKeyword(['1', 'planes'], { sensitive: true })
    .addAnswer(
        [
            '🤖 En Emenet Comunicaciones contamos con planes mensuales y planes anuales, cada uno con ventejas diferentes segun tus necesidades',
            '',
            '   *1.* Ver planes mensuales',
            '   *2.* Ver planes anuales'
        ],
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
            tipoPlanes = body;
            if (body == 1) {
                const planes = await obtenerPlanesInternetTipo('mensual');
                await flowDynamic('🤖 Los planes mensuales de emenet proporcionan flexibilidad y son ideales para compromisos a corto plazo o para probar servicios sin una gran inversión inicial');
                return await flowDynamic(planes);
            } else if (body == 2) {
                const planes = await obtenerPlanesInternetTipo('anual');
                await flowDynamic('🤖 Los planes anuales de emenet ofrecen ahorro, estabilidad y soporte continuo, ideales para quienes buscan una solución económica 💵 y confiable a largo plazo');
                return await flowDynamic(planes);
            }

            await flowDynamic('Se debe colocar una opción valida');
            return fallBack();
        }
    )
    .addAnswer(
        '🤖 ¿Qué plan te interesa más?',
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            if (ctx.body == '📋 Volver al menú principal') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const input = normalizeString(ctx.body);

            if (isNaN(input)) {
                await flowDynamic('Se debe colocar una opción válida');
            } else {
                const plan = await obtenerPlanPorIdentificador(tipoPlanes, input);

                if (!plan) {
                    await flowDynamic('No se encontró ningún plan con ese identificador.\nPor favor, introduce un identificador válido.');
                } else {
                    await flowDynamic(plan.mensaje);

                    const { flowSecundario } = require("../start/flowSecundario");
                    return await gotoFlow(flowSecundario);
                }
            }

            return fallBack();
        }
    )

module.exports = { flowConsultaPlanes };