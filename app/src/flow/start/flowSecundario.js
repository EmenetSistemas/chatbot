const { addKeyword } = require("@bot-whatsapp/bot");
const { validarSesion } = require("../../services/client.service");

const flowSecundario = addKeyword('keen_mclovin', { sensitive: true })
    .addAction(
        async (ctx, { flowDynamic, endFlow, provider }) => {
            const status = await validarSesion(ctx.from);

            if (status) {
                return await endFlow();
            }
            
            const abc = await provider.getInstance();
            await abc.readMessages([ctx.key]);
            await abc.chatModify({ archive: true, lastMessages: [ctx] }, ctx.key.remoteJid);

            return await flowDynamic('🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?\n\n   *1.* Ver menú principal 📑\n   *2.* Terminar la conversación 👋\n');
        }
    )
    .addAction(
        { capture: true },
        async (ctx, { flowDynamic, fallBack, gotoFlow, endFlow, provider }) => {
            const status = await validarSesion(ctx.from);

            if (status) {
                return await endFlow();
            }

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