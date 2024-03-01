const { createFlow } = require("@bot-whatsapp/bot");

const { flowPrincipal } = require("./start/flowPrincipal");
const { flowSecundario } = require("./start/flowSecundario");
const { flowDefault } = require("./start/flowDefault");
const { flowConsultaPlanes } = require("./web/flowConsultaPlanes");
const { flowCoberturaInternet } = require("./web/flowCoberturaInternet");
const { flowContratacion } = require("./web/flowContratacion");

const flow = createFlow(
    [
        flowPrincipal,
        flowSecundario,
        flowConsultaPlanes,
        flowCoberturaInternet,
        flowContratacion,
        flowDefault
    ]
);

module.exports = { flow };