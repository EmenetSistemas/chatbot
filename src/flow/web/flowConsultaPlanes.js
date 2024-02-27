const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerPlanesInternet, obtenerPlanPorId } = require("../../services/web.service");

const flowConsultaPlanes = addKeyword(['1', 'planes'])
    .addAnswer(
        'Los planes/paquetes de internet con los que contamos actualmente, son los siguientes:',
        null,
        async (_, { flowDynamic }) => {
            const planes = await obtenerPlanesInternet();
            await flowDynamic(
                [
                    planes,
                    '¿Que plan te interesa más?'
                ]
            );
        }
    )
    .addAnswer(
        [
            '',
            '- Coloque indetificador del plan para saber más',
            '- *Menu* para volver al menú principal'
        ],
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            const input = ctx.body.toLowerCase();

            if (input == 'menu') {
                const {flowPrincipal} = require("../start/flowPrincipal");
                return await gotoFlow(flowPrincipal);
            }

            if (!isNaN(input)) {
                const plan = await obtenerPlanPorId(input);

                if (plan == null) {
                    await flowDynamic(
                        [
                            'No se encontró ningún plan con ese identificador\nSe debe colocar un plan válido',
                            '¿Que plan te interesa más?'
                        ]
                    );
                    return fallBack();
                }

                await flowDynamic(
                    [
                        plan,
                        '¿En que más te puedo ayudar?'
                    ]
                );
                return fallBack();
            } else {
                await flowDynamic(
                    [
                        'Se debe colocar una opción válida',
                        '¿Que plan te interesa más?'
                    ]
                );
                return fallBack();
            }
        }
    )

module.exports = { flowConsultaPlanes };