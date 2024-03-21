const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require("../../services/generic.service");

const flowOptions = addKeyword('0', 'keen_mclovin', { sensitive: true })
    .addAnswer(
        [
            `🤖 ¿En que más puedo ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
        ],
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
            const keywords = flujosPrincipales.map(item => item.ctx.keyword).flat();

            if (!keywords.includes(body)) {
                await flowDynamic('Se debe colocar una opción válida');
                return await fallBack();
            }
        },
        flujosPrincipales
    )

module.exports = { flowOptions };