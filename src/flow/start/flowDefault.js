const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowDefault = addKeyword(EVENTS.WELCOME)
    .addAnswer(
        [
            'Eso no lo se :(',
            '',
            '1. *menu* Volver al menú principal'
        ]
    )

module.exports = { flowDefault };