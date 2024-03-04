const { addKeyword } = require('@bot-whatsapp/bot');

const { flowConsultaPlanes } = require('../web/flowConsultaPlanes');
const { flowCoberturaInternet } = require('../web/flowCoberturaInternet');
const { flowContratacion } = require('../web/flowContratacion');
const { flowPagoInternet } = require('../web/flowPagoInternet');

const { obtenerSaludo } = require('../../services/web.service');
const { obtenerOpcionesFlujoPrincipal } = require('../../services/generic.service');

const flowPrincipal = addKeyword(['hola', 'menu'])
    .addAnswer(`🤖 Hola ${obtenerSaludo()}, bienvenido al chatbot de *Emenet*`)
    .addAnswer(
        [
            `🤖 ¿En que puedo ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
        ],
        null,
        null,
        [flowConsultaPlanes, flowCoberturaInternet, flowContratacion, flowPagoInternet]
    )

module.exports = { flowPrincipal };