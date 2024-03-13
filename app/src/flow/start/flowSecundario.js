const { addKeyword } = require("@bot-whatsapp/bot");

const { validarSesion } = require("../../services/client.service");
const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require("../../services/generic.service");

const flowSecundario = addKeyword(['no'], { sensitive: true })
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
    .addAnswer(
        [
            `🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
        ],
        null,
        null,
        flujosPrincipales
    )

module.exports = { flowSecundario };