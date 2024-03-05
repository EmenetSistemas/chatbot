const { addKeyword } = require("@bot-whatsapp/bot");
const { capturarImagen } = require("../../services/generic.service");

const flowRegistrarComprobantePago = addKeyword('5', { sensitive: true })
    .addAnswer(
        '🤖 Por favor envíe la captura o foto de su comprobante de pago',
        { capture: true },
        async (ctx, { flowDynamic, fallBack }) => {
            const imagen = ctx.message.imageMessage;

            if (!imagen) {
                await flowDynamic('No es lo que se esperaba');
                return await fallBack();
            }

            return await flowDynamic([
                'Se capturó tu comprobante de pago',
                '🤖 Ahora, ¿A nombre de quien se encuentra el servicio?'
            ]);
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow }) => {
            await flowDynamic('🤖 Excelente, gracias por compartirnos la información, está será validada 🧑🏻‍💻 para poder ser aprobada, posterior a eso te enviaremos tu comprobante lo antes posible 📑');
            
            const { flowSecundario } = require("../start/flowSecundario");
            return await gotoFlow(flowSecundario);
        }
    );

module.exports = { flowRegistrarComprobantePago };