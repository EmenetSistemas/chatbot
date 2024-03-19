const { addKeyword } = require("@bot-whatsapp/bot");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const { registrarComprobantePago, detectFileType } = require("../../services/client.service");
const { normalizeString } = require("../../services/web.service");

let file, typeFile = 'unknown', nombreServicio;

const flowRegistrarComprobantePago = addKeyword(['5', 'comprobante', 'pago'], { sensitive: true })
    .addAnswer([
        '🤖 Para poder capturar tu comprobante de pago requerimos de 3 datos, los cuales te estaré solicitando uno por uno',
        '',
        '❌ Si deseas cancelar o salir de este proceso lo puedes realizar en cualquier momento colocando la palabra *cancelar*'
    ])
    .addAnswer(
        '🤖 Por favor envíe únicamente la captura o foto de su comprobante de pago',
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            const input = normalizeString(ctx.body);

            if (input == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

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
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            const input = normalizeString(ctx.body);

            if (input == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            if (input.split(' ').length <= 2) {
                await flowDynamic([
                    'Se debe colocar nombre completo',
                    '🤖 Ahora, ¿A nombre de quien se encuentra el servicio?'
                ]);
                return await fallBack();
            }

            nombreServicio = ctx.body;
            
            return await flowDynamic(`🤖 Excelente *${ctx.body}* ahora, algún comentario u observación acerca de tu pago...?`);
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow }) => {
            const input = normalizeString(ctx.body);

            if (input == 'cancelar') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }
            
            const data = {
                nombreServicio: nombreServicio,
                numeroContacto: ctx.from,
                comprobantePago: file,
                tipoArchivoComprobante: typeFile,
                comentarios: ctx.body
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
    )

module.exports = { flowRegistrarComprobantePago };