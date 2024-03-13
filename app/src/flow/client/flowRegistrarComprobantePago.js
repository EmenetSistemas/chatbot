const { addKeyword } = require("@bot-whatsapp/bot");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const { registrarComprobantePago, detectFileType } = require("../../services/client.service");

let file, typeFile = 'unknown';

const flowRegistrarComprobantePago = addKeyword('5', { sensitive: true })
    .addAnswer(
        '🤖 Por favor envíe la captura o foto de su comprobante de pago',
        { capture: true },
        async (ctx, { flowDynamic, fallBack }) => {
            try {
                const buffer = await downloadMediaMessage(ctx, "buffer");
                file = buffer.toString('base64');

                typeFile = detectFileType(file);
                if (typeFile == 'unknown') {
                    await flowDynamic('No es un tipo de archivo válido');
                    return await fallBack();
                }
            } catch (e) {
                await flowDynamic('No es un tipo de archivo válido');
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
        async (ctx, { flowDynamic, gotoFlow }) => {
            const data = {
                nombreServicio: ctx.body,
                numeroContacto: ctx.from,
                comprobantePago: file,
                tipoArchivoComprobante: typeFile
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