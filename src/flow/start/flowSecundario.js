const { addKeyword } = require("@bot-whatsapp/bot");

const { crearMensajeConBotones, obtenerOpcionesFlujoPrincipal } = require("../../services/generic.service");

const flowSecundario = addKeyword(['no'], { sensitive: true })
    .addAction(
        async (_, { flowDynamic }) => {
            const mensaje = `🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?\n${await obtenerOpcionesFlujoPrincipal()}`
            return await flowDynamic([
                `🙌 Hola ${obtenerSaludo()}, bienvenido al chatbot de *Emenet*`,
                mensaje + '\n\nRealice un test de velicidad en el siguiente link: https://emenet.m-net.mx/inicio#team'
            ]);
        }
    )

module.exports = { flowSecundario };