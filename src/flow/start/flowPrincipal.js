const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');

const { crearMensajeConBotones, obtenerOpcionesFlujoPrincipal } = require('../../services/generic.service');

const flowPrincipal = addKeyword(['hola', 'menu'])
    .addAction(
        async ({ from }, { flowDynamic }) => {
            await flowDynamic(`🙌 Hola ${obtenerSaludo()}, bienvenido al chatbot de *Emenet*`);
            const mensaje = `🤖 ¿En que puedo ayudarte el día de hoy?\n${await obtenerOpcionesFlujoPrincipal()}`
            await crearMensajeConBotones(from, mensaje, [
                { textoBoton: '🛜 Realiza un test de velocidad', url: 'https://emenet.m-net.mx/inicio#team' }
            ]);
        }
    )

module.exports = { flowPrincipal };