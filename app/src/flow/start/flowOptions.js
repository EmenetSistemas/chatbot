const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require("../../services/generic.service");
const { validarSesion } = require("../../services/client.service");

const flowOptions = addKeyword('0', 'keen_mclovin', { sensitive: true })
    .addAction(
        async ({ from }, { endFlow }) => {
            const status = await validarSesion(from);

            if (status) {
                return await endFlow();
            }
        }
    )
    .addAnswer(
        [
            `🤖 ¿En que más puedo ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
        ],
        { capture: true },
        async (ctx, { flowDynamic, fallBack, endFlow }) => {
            const status = await validarSesion(ctx.from);

            if (status) {
                return await endFlow();
            }
            
            const keywords = flujosPrincipales.map(item => item.ctx.keyword).flat();

            if (!keywords.includes(ctx.body)) {
                await flowDynamic('Se debe colocar una opción válida');
                return await fallBack();
            }
        },
        flujosPrincipales
    )

module.exports = { flowOptions };