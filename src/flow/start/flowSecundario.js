const { addKeyword } = require("@bot-whatsapp/bot");

const { crearMensajeConBotones } = require("../../services/generic.service");

const flowSecundario = addKeyword(['no'], { sensitive: true })
    .addAction(
        async ({ from }) => {
            const mensaje = `🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?\n\n1. Ver planes de internet\n2. Validar mi cobertura\n3. Conctactar con un asesor para contratar internet`
            await crearMensajeConBotones(from, mensaje, [
                { textoBoton: '🛜 Realiza un test de velocidad', url: 'https://emenet.m-net.mx/inicio#team' }
            ]);
        }
    )

module.exports = { flowSecundario };