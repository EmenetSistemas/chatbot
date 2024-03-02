const { addKeyword } = require("@bot-whatsapp/bot");

const { obtenerOpcionesFlujoPrincipal } = require("../../services/generic.service");

const flowSecundario = addKeyword(['no'], { sensitive: true })
    .addAction(
        async (_, { flowDynamic }) => {
            const mensaje = `🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?\n${await obtenerOpcionesFlujoPrincipal()}`
            return await flowDynamic(mensaje + '\n\nRealice un test de velicidad en el siguiente link: https://emenet.m-net.mx/inicio#team');
        }
    )

module.exports = { flowSecundario };