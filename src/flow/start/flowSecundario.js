const { addKeyword } = require("@bot-whatsapp/bot");

const { flowConsultaPlanes } = require("../web/flowConsultaPlanes");
const { flowCoberturaInternet } = require("../web/flowCoberturaInternet");
const { flowContratacion } = require("../web/flowContratacion");
const { flowDefault } = require("./flowDefault");

const flowSecundario = addKeyword(['no'])
    .addAnswer(
        [
            '🤖 ¿En que más puedo ayudarte el día de hoy?',
            '',
            '1. Ver planes de internet',
            '2. Validar mi cobertura',
            '3. Conctactar con un asesor para contratar internet'
        ],
        null,
        null,
        [flowConsultaPlanes, flowCoberturaInternet, flowContratacion, flowDefault]
    )

module.exports = { flowSecundario };