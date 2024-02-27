const { addKeyword } = require("@bot-whatsapp/bot");
const { obtenerPlanesInternet, obtenerPlanPorId } = require("../../services/web.service");
const { flowPrincipal } = require("../start/flowPrincipal");

const flowConsultaPlanes = addKeyword(['1', 'planes'])
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
            '- Coloque indetificador del plan para saber más',
            '- *Menu* para volver al menú principal'
        ],
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow, fallBack }) => {
            const input = body.toLowerCase();

            if (input === 'menu') {
                const {flowPrincipal} = require("../start/flowPrincipal");
                return await gotoFlow(flowPrincipal);
            }

            if (!isNaN(input)) {
                const plan = await obtenerPlanPorId(input);

                if (!plan) {
                    await flowDynamic([
                        'No se encontró ningún plan con ese identificador\nPor favor, introduce un identificador válido.',
                        '¿Qué plan te interesa más?'
                    ]);
                } else {
                    await flowDynamic([plan, '¿En qué más te puedo ayudar?']);
                }
            } else {
                await flowDynamic([
                    'Se debe colocar una opción válida',
                    '¿Qué plan te interesa más?'
                ]);
            }

            await fallBack();
        }
    );

module.exports = { flowConsultaPlanes };