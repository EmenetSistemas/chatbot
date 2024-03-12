const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const { validarSesion } = require("../../services/client.service");
const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require("../../services/generic.service");

const flowDefault = addKeyword(EVENTS.WELCOME)
    .addAction(
        async ({ from }, { endFlow }) => {
            const status = await validarSesion(from);

            if (status) {
                return endFlow();
            }
        }
    )
    .addAnswer('Eso no lo se :(')
    .addAnswer(
        [
            `🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
        ],
        null,
        null,
        flujosPrincipales
    )

module.exports = { flowDefault };