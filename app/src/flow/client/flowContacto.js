const { addKeyword } = require("@bot-whatsapp/bot");

const flowContacto = addKeyword('6', { sensitive: true })
    .addAnswer('🤖 Para contactar vía telefónica con alguno de nuestros asesores lo puedes realizar con los siguientes números:')
    .addAnswer([
        'Soporte 🛜',
        '',
        '📞 722 916 9999 (EXT. 1 y 2)',
        '📞 713 133 4557 (EXT. 1 y 2)',
        ''
    ])
    .addAction(
        async (ctx, { gotoFlow, provider }) => {
            const abc = await provider.getInstance();
            await abc.readMessages([ctx.key]);

            const { flowSecundario } = require("../start/flowSecundario");
            return await gotoFlow(flowSecundario);
        }
    )

module.exports = { flowContacto };