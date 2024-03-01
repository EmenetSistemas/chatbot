const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');

const { crearMensajeConBotones } = require('../../services/generic.service');

const flowPrincipal = addKeyword(['hola', 'menu'])
    .addAction(
        async ({ from }, { flowDynamic }) => {
            await flowDynamic(`🙌 Hola ${obtenerSaludo()}, bienvenido al chatbot de *Emenet*`);
            const mensaje = `🤖 ¿En que puedo ayudarte el día de hoy?\n\n1. Ver planes de internet\n2. Validar mi cobertura\n3. Conctactar con un asesor para contratar internet`
            await crearMensajeConBotones(from, mensaje, [
                { textoBoton: '🛜 Realiza un test de velocidad', url: 'https://emenet.m-net.mx/inicio#team' }
            ]);
        }
    )

module.exports = { flowPrincipal };