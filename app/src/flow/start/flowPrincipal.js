const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');
const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require('../../services/generic.service');
const { validarSesion } = require('../../services/client.service');

const flowPrincipal = addKeyword(['hola', 'menu', 'buenas', 'buenos'])
    .addAction(
        async (ctx, { flowDynamic, endFlow, provider }) => {
            const status = await validarSesion(ctx.from);

            if (!status) {
                const abc = await provider.getInstance();
                return await abc.chatModify({ archive: true, lastMessages: [ctx] }, ctx.key.remoteJid);
            }
            
            await flowDynamic(`🧑🏻‍💻 Por favor espere, nos encontramos trabajando para poder atenderle lo antes posible...`);
            return endFlow();
        }
    )
    .addAnswer(`🙌 Hola ${obtenerSaludo()}, bienvenido al 🤖 chatbot de *Emenet*`)
    .addAnswer(
        [
            `🤖 ¿En que puedo ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
        ],
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
            const keywords = flujosPrincipales.map(item => item.ctx.keyword).flat();

            if (!keywords.some(keyword => body.includes(keyword))) {
                await flowDynamic('Se debe colocar una opción válida');
                return await fallBack();
            }
        },
        flujosPrincipales
    )

module.exports = { flowPrincipal };