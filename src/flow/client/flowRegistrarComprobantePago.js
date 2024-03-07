const { addKeyword } = require("@bot-whatsapp/bot");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const { registrarComprobantePago } = require("../../services/client.service");

let img64;

const flowRegistrarComprobantePago = addKeyword('5', { sensitive: true })
    .addAnswer(
        '🤖 Por favor envíe la captura o foto de su comprobante de pago',
        { capture: true },
        async (ctx, { flowDynamic, fallBack }) => {
            //await provider.sendMessage(ctx.from+'@c.us', 'Gracias por enviar la imagen', { replyTo: ctx.key.id });
            //await provider.sendMessage(ctx.from+'@c.us', 'Gracias por enviar la imagen', { quoted: ctx.key.id });

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
        async (ctx, { flowDynamic, gotoFlow }) => {
            const data = {
                nombreServicio  : ctx.body,
                numeroContacto  : ctx.from,
                comprobantePago : img64
            };

            const errorPeticion = await registrarComprobantePago(data);

            if (errorPeticion) {
                await flowDynamic('Upss...! Al parecer ocurrió un error al registrar tu información, ¿podrías intentar nuevamente?');

                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            await flowDynamic('🤖 Excelente, gracias por compartirnos la información, está será validada 🧑🏻‍💻 para poder ser aprobada, posterior a eso te enviaremos tu comprobante lo antes posible 📑');

            const { flowSecundario } = require("../start/flowSecundario");
            return await gotoFlow(flowSecundario);
        }
    );

module.exports = { flowRegistrarComprobantePago };