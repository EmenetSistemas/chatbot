const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');

const { flowInternet } = require('../web');

const flowPrincipal = addKeyword(['hola'])
    .addAnswer(`🙌 Hola ${obtenerSaludo()}, bienvenido al 🤖 chatbot de *Emenet*`)
    .addAnswer(
        [
            '¿En que puedo ayudarte el día de hoy?',
            '',
            '1. 📋 *Internet* (ver los planes con los que contamos y más)'
        ],
        null,
        null,
        [flowInternet]
    )

module.exports = { flowPrincipal };