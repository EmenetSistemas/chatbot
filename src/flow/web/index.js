const { addKeyword } = require("@bot-whatsapp/bot");

const { flowConsultaPlanes } = require("./flowConsultaPlanes");
const { flowCoberturaInternet } = require("./flowCoberturaInternet");

const flowInternet = addKeyword(['1', 'internet'])
    .addAnswer([
        'En Emenet contamos con planes de servicio de internet a través de *fibra óptica* y por antena *vía inalámbrica*',
        '',
        'De los cuales podrás elegir el que mejor se ajuste a tus necesidades, una vez se haya validado la cobertura del mismo en tu domicilio',
    ])
    .addAnswer(
        [
            '¿Qué te gustaría ver por ahora?',
            '',
            '1. *Planes*',
            '2. *Cobertura*'
        ],
        null,
        null,
        [flowConsultaPlanes, flowCoberturaInternet]
    )

module.exports = { flowInternet };