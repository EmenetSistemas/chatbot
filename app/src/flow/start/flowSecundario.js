const { addKeyword } = require("@bot-whatsapp/bot");

const flowSecundario = addKeyword(['keen_mclovin'], { sensitive: true })
    .addAction(
        async (ctx, { provider }) => {
            const abc = await provider.getInstance();
            await abc.readMessages([ctx.key]);
            await abc.chatModify({ archive: true, lastMessages: [ctx] }, ctx.key.remoteJid);
        }
    )
    .addAnswer(
        [
            '🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?',
            '',
            '   *1.* Ver menú principal 📑',
            '   *2.* Terminar la conversación 👋',
            ''
        ],
        { capture: true },
        async (ctx, { flowDynamic, fallBack, gotoFlow, provider }) => {
            if (ctx.body == '1') {
                const { flowOptions } = require("../start/flowOptions");
                return await gotoFlow(flowOptions);
            }

            if (ctx.body == '2') {
                const abc = await provider.getInstance();
                await abc.readMessages([ctx.key]);
                return await flowDynamic('🤖 Espero hayas encontrado lo que buscabas, cuando me necesitas solo manda un *hola*');
            }

            await flowDynamic('Se debe colocar una opción válida');
            return await fallBack();
        }
    )

module.exports = { flowSecundario };