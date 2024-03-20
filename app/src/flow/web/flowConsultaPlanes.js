const { addKeyword } = require("@bot-whatsapp/bot");

const { normalizeString, obtenerPlanesInternetTipo, obtenerPlanPorIdentificador } = require("../../services/web.service");

let tipoPlanes;

const flowConsultaPlanes = addKeyword(['1', 'planes'], { sensitive: true })
    .addAnswer(
        [
            '🤖 En Emenet Comunicaciones contamos con planes mensuales y planes anuales, cada uno con ventajas diferentes según tus necesidades ¿Cuál te interesa más?',
            '',
            '   *1.* Planes mensuales',
            '   *2.* Planes anuales'
        ],
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
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
            return await fallBack();
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            const input = normalizeString(ctx.body);

            if (!isNaN(input)) {
                const plan = await obtenerPlanPorIdentificador(tipoPlanes, input);

                if (plan) {
                    await flowDynamic(plan.mensaje);

                    const { flowSecundario } = require("../start/flowSecundario");
                    return await gotoFlow(flowSecundario);
                }
            }

            await flowDynamic([
                'No se encontró ningún plan con ese identificador.\nPor favor, introduce un identificador válido',
                '🤖 ¿Qué plan te interesa más?'
            ]);

            return await fallBack();
        }
    )

module.exports = { flowConsultaPlanes };