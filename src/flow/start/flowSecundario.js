const { addKeyword } = require("@bot-whatsapp/bot");
const { flowInternet } = require("../web");

const flowSecundario = addKeyword(['no'])
    .addAnswer(
        [
            '¿Qué más te gusraría hacer por ahora?',
            '',
            '1. 📋 *Internet* (ver los planes con los que contamos y más)'
        ],
        null,
        null,
        [flowInternet]
    )

module.exports = { flowSecundario };