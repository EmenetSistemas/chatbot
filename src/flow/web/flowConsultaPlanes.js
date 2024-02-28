const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerPlanesInternet, obtenerPlanPorId, normalizeString } = require("../../services/web.service");

const flowConsultaPlanes = addKeyword(['1', 'planes', 'si'])
    .addAnswer(
        'Los planes/paquetes de internet con los que contamos actualmente, son los siguientes:',
        null,
        async (_, { flowDynamic }) => {
            const planes = await obtenerPlanesInternet();
            await flowDynamic([planes, '¿Qué plan te interesa más?']);
        }
    )
    .addAnswer(
        [
            '',
            '- Coloque identificador del plan para saber más',
            '- *Menu* para volver al menú principal'
        ],
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow, fallBack }) => {
            const input = normalizeString(body);

            if (input == 'menu') {
                const { flowPrincipal } = require("../start/flowPrincipal");
                return await gotoFlow(flowPrincipal);
            }

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
                    await flowDynamic([plan, '¿En qué más te puedo ayudar?']);
                }
            }

            await fallBack();
        }
    );

module.exports = { flowConsultaPlanes };