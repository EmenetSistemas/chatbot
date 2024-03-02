const { addKeyword } = require("@bot-whatsapp/bot");

const { flowConsultaPlanes } = require('../web/flowConsultaPlanes');
const { flowCoberturaInternet } = require('../web/flowCoberturaInternet');
const { flowContratacion } = require('../web/flowContratacion');
const { flowPagoInternet } = require('../web/flowPagoInternet');

const { obtenerOpcionesFlujoPrincipal } = require("../../services/generic.service");

const flowSecundario = addKeyword(['no'], { sensitive: true })
    .addAnswer(
        [
            `🤖 ¿Algo más en lo que pueda ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`,
            '',
            'Realice un test de velicidad en el siguiente link: https://emenet.m-net.mx/inicio#team'
        ],
        null,
        null,
        [flowConsultaPlanes, flowCoberturaInternet, flowContratacion, flowPagoInternet]
    )

module.exports = { flowSecundario };