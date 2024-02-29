const { addKeyword } = require("@bot-whatsapp/bot");

const { flowConsultaPlanes } = require("../web/flowConsultaPlanes");
const { flowCoberturaInternet } = require("../web/flowCoberturaInternet");
const { flowContratacion } = require("../web/flowContratacion");

const flowSecundario = addKeyword(['no'], { sensitive: true })
    .addAnswer(
        [
            'Opciones:',
            '',
            '1. Ver planes de internet',
            '2. Validar mi cobertura',
            '3. Conctactar con un asesor para contratar internet'
        ],
        null,
        null,
        [flowConsultaPlanes, flowCoberturaInternet, flowContratacion]
    )
    .addAction(
        async ({ from }) => {
            const botones = [
                { textoBoton: 'Realizar un test de velocidad', url: 'https://emenet.m-net.mx/inicio#team' }
            ];
            await crearMensajeConBotones(from, '🤖 ¿En que más puedo ayudarte el día de hoy?', botones);
        }
    )

module.exports = { flowSecundario };