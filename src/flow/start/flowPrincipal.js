const { addKeyword } = require('@bot-whatsapp/bot');

const { obtenerSaludo } = require('../../services/web.service');
const { flowConsultaPlanes } = require('../web/flowConsultaPlanes');
const { flowCoberturaInternet } = require('../web/flowCoberturaInternet');
const { flowContratacion } = require('../web/flowContratacion');

const flowPrincipal = addKeyword(['hola'])
    .addAnswer(`🙌 Hola ${obtenerSaludo()}, bienvenido al 🤖 chatbot de *Emenet*`)
    .addAnswer(
        [
            '¿En que puedo ayudarte el día de hoy?',
            '',
            '1. Ver planes de internet',
            '2. Validar mi cobertura',
            '3. Conctactar con un asesor para contratar internet'
        ],
        null,
        null,
        [flowConsultaPlanes, flowCoberturaInternet, flowContratacion]
    )

module.exports = { flowPrincipal };