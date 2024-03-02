const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');
const { obtenerOpcionesFlujoPrincipal } = require('../../services/generic.service');

const flowPrincipal = addKeyword(['hola', 'menu'])
    .addAction(
        async (_, { flowDynamic }) => {
            const mensaje = `🤖 ¿En que puedo ayudarte el día de hoy?\n${await obtenerOpcionesFlujoPrincipal()}`

            return await flowDynamic([
                `🙌 Hola ${obtenerSaludo()}, bienvenido al chatbot de *Emenet*`,
                mensaje+'\n\n Realice un test de velicidad en el siguiente link: https://emenet.m-net.mx/inicio#team'
            ]);
        }
    )

module.exports = { flowPrincipal };