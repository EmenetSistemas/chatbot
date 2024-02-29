const { provider } = require('../shared/provider')

const crearMensajeConBotones = async (telefono, textoPrincipal, botones) => {
    const templateMessage = {
        text: textoPrincipal,
        templateButtons: [],
    };

    botones.forEach((boton, index) => {
        const { textoBoton, url } = boton;
        templateMessage.templateButtons.push({
            index: index + 1,
            urlButton: {
                displayText: textoBoton,
                url: url ?? 'https://wa.me/5217294537569?text='+textoBoton
            }
        });
    });

    const abc = await provider.getInstance();
    await abc.sendMessage(telefono + '@c.us', templateMessage);
}

module.exports = { crearMensajeConBotones };