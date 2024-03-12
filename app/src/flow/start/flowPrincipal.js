const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');
const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require('../../services/generic.service');
const { validarSesion } = require('../../services/client.service');

const flowPrincipal = addKeyword(['hola', 'menu'])
    .addAction(
        async ({ from }, { endFlow }) => {
            const status = await validarSesion(from);
            
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