const { provider } = require('../shared/provider');

const obtenerOpcionesFlujoPrincipal = () => {
    const opciones = [
        '    *1.* Ver planes de internet 📑',
        '    *2.* Validar mi cobertura 🌎',
        '    *3.* Conctactar con un asesor para contratar internet 🧑🏻‍💻',
        '    *4.* Realizar un pago de servicio 💵'
    ];

    const opcionesConSaltoInicial = [''].concat(opciones);

    return opcionesConSaltoInicial.join('\n');
}

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

module.exports = { obtenerOpcionesFlujoPrincipal, crearMensajeConBotones };