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
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
            const op = isNaN(body) ? 0 : parseInt(body);

            if (op < 1 || op > 6) {
                await flowDynamic('Se debe colocar una opción válida');
                return await fallBack();
            }
        },
        flujosPrincipales
    )

module.exports = { flowPrincipal };