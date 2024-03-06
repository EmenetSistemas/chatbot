const fs = require('fs');

const { addKeyword } = require("@bot-whatsapp/bot");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");

let img64;

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

            const buffer = await downloadMediaMessage(ctx, "buffer");
            img64 = buffer.toString('base64');

            return await flowDynamic([
                'Se capturó tu comprobante de pago',
                '🤖 Ahora, ¿A nombre de quien se encuentra el servicio?'
            ]);
        }
    )
    .addAction(
        { capture: true },
        async ({ body }, { flowDynamic, gotoFlow }) => {
            const nombreServicio = body;
            
            //proceso registrar pago

            await flowDynamic('🤖 Excelente, gracias por compartirnos la información, está será validada 🧑🏻‍💻 para poder ser aprobada, posterior a eso te enviaremos tu comprobante lo antes posible 📑');

            const { flowSecundario } = require("../start/flowSecundario");
            return await gotoFlow(flowSecundario);
        }
    );

module.exports = { flowRegistrarComprobantePago };