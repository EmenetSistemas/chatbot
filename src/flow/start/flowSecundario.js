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
            'Visita nuestra página:\nhttps://m-net.mx/',
            'Realice un test de velicidad:\nhttps://emenet.m-net.mx/inicio#team'
        ],
        null,
        null,
        [flowConsultaPlanes, flowCoberturaInternet, flowContratacion, flowPagoInternet]
    )

module.exports = { flowSecundario };