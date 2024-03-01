const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerPlanesInternet, obtenerPlanPorId, normalizeString } = require("../../services/web.service");
const { crearMensajeConBotones } = require("../../services/generic.service");

const buttons = [
    { textoBoton: '📋 Volver al menú principal' }
];

const flowConsultaPlanes = addKeyword('1', { sensitive: true })
    .addAnswer(
        '🤖 Los planes/paquetes de internet con los que contamos actualmente, son los siguientes:',
        null,
        async ({ from }, { flowDynamic }) => {
            const planes = await obtenerPlanesInternet();
            await flowDynamic(planes);
            await crearMensajeConBotones(from, '🤖 ¿Qué plan te interesa más?', buttons);
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            if (ctx.body == '📋 Volver al menú principal') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const input = normalizeString(ctx.body);

            if (isNaN(input)) {
                await flowDynamic('Se debe colocar una opción válida');
                await crearMensajeConBotones(ctx.from, '🤖 ¿Qué plan te interesa más?', buttons);
            } else {
                const plan = await obtenerPlanPorId(input);

                if (!plan) {
                    await flowDynamic('No se encontró ningún plan con ese identificador.\nPor favor, introduce un identificador válido.');
                    await crearMensajeConBotones(ctx.from, '🤖 ¿Qué plan te interesa más?', buttons);
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