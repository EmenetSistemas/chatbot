const { addKeyword } = require("@bot-whatsapp/bot");

const { validarSesion } = require("../../services/client.service");
const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require("../../services/generic.service");

const flowSecundario = addKeyword(['no'], { sensitive: true })
    .addAction(
        async (ctx, { endFlow, provider }) => {
            const abc = await provider.getInstance();
            await abc.readMessages([ctx.key]);
            await abc.chatModify({ archive: true, lastMessages: [ctx] }, ctx.key.remoteJid);

            const status = await validarSesion(ctx.from);

            if (status) {
                return endFlow();
            }
        }
    )
    .addAnswer(
        [
            '🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?',
            '',
            '   *1.* Volver al menú principal 📑',
            '   *2.* Terminar la conversación 👋',
            ''
        ],
        { capture: true },
        async ({ body }, { flowDynamic, fallBack, gotoFlow }) => {
            if (body == '1') {
                const { flowOptions } = require("../start/flowOptions");
                return await gotoFlow(flowOptions);
            }

            if (body == '2') {
                return await flowDynamic('🤖 Espero hayas encontrado lo que buscabas, cuando me necesitas solo manda un *hola*');
            }

            await flowDynamic('Se debe colocar una opción válida');
            return await fallBack();
        }
    )

module.exports = { flowSecundario };