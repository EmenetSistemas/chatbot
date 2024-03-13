const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');
const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require('../../services/generic.service');
const { validarSesion } = require('../../services/client.service');

const flowPrincipal = addKeyword(['hola', 'menu'])
    .addAction(
        async (ctx, { endFlow, provider }) => {
            const abc = await provider.getInstance();
            await abc.chatModify({ archive: true, lastMessages: [ctx] }, ctx.key.remoteJid);

            const status = await validarSesion(ctx.from);
            
            if (status) {
                return endFlow();
            }
        }
    )
    .addAnswer(`🙌 Hola ${obtenerSaludo()}, bienvenido al 🤖 chatbot de *Emenet*`)
    .addAnswer(
        [
            `🤖 ¿En que puedo ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
        ],
        null,
        null,
        flujosPrincipales
    )

module.exports = { flowPrincipal };