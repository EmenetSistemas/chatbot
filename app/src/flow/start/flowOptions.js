const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require("../../services/generic.service");

const flowOptions = addKeyword('1')
    .addAnswer(
        [
            `🤖 ¿En que más puedo ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
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

module.exports = { flowOptions };