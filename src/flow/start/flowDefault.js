const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowDefault = addKeyword(EVENTS.WELCOME)
    .addAnswer(
        'Eso no lo se :(',
        null,
        async (_, { gotoFlow }) => {
            const { flowSecundario } = require("../start/flowSecundario");
            return await gotoFlow(flowSecundario);
        }
    )

module.exports = { flowDefault };