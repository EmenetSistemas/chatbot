const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowDefault = addKeyword(EVENTS.WELCOME)
    .addAnswer(
        'Eso no lo se :(',
        null,
        async ({ from }, { provider, gotoFlow }) => {
            //await provider.sendSticker(from + '@c.us', 'https://chat.galasoftsolutions.com/35f7fc89-28c7-4102-959c-a8b5ab2f9619.png', { pack: 'User', author: 'Me' });

            const { flowSecundario } = require("../start/flowSecundario");
            return await gotoFlow(flowSecundario);
        }
    )

module.exports = { flowDefault };