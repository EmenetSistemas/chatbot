const { createFlow } = require("@bot-whatsapp/bot");

const { flowPrincipal } = require("./start/flowPrincipal");
const { flowContratacion } = require("./web/flowContratacion");
const { flowSecundario } = require("./start/flowSecundario");

const flow = createFlow(
    [
        flowPrincipal,
        flowSecundario,
        flowContratacion
    ]
);

module.exports = { flow };