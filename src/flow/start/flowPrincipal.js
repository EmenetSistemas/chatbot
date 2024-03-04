const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');
const { obtenerOpcionesFlujoPrincipal, flujosPrincipales } = require('../../services/generic.service');

const flowPrincipal = addKeyword(['hola', 'menu'])
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