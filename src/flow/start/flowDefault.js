const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowDefault = addKeyword(EVENTS.WELCOME)
    .addAnswer(
        'Eso no lo se :(',
        { media: 'https://pbs.twimg.com/media/F0m57pDXgAYjgpj.jpg' },
        async (_, { gotoFlow }) => {
            const { flowSecundario } = require("../start/flowSecundario");
            return await gotoFlow(flowSecundario);
        }
    )

module.exports = { flowDefault };