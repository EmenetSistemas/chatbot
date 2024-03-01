const { addKeyword } = require("@bot-whatsapp/bot");

const { crearMensajeConBotones, obtenerOpcionesFlujoPrincipal } = require("../../services/generic.service");

const flowSecundario = addKeyword(['no'], { sensitive: true })
    .addAction(
        async ({ from }) => {
            const mensaje = `🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?\n${await obtenerOpcionesFlujoPrincipal()}`
            await crearMensajeConBotones(from, mensaje, [
                { textoBoton: '🛜 Realiza un test de velocidad', url: 'https://emenet.m-net.mx/inicio#team' }
            ]);
        }
    )

module.exports = { flowSecundario };