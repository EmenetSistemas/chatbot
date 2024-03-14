const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerPlanesInternet, obtenerPlanPorId, normalizeString } = require("../../services/web.service");

const flowConsultaPlanes = addKeyword(['1', 'planes'], { sensitive: true })
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
                    await flowDynamic(plan);

                    const { flowSecundario } = require("../start/flowSecundario");
                    return await gotoFlow(flowSecundario);
                }
            }

            return fallBack();
        }
    );

module.exports = { flowConsultaPlanes };