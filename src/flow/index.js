const { createFlow } = require("@bot-whatsapp/bot");

const { flowPrincipal } = require("./start/flowPrincipal");
const { flowSecundario } = require("./start/flowSecundario");
const { flowDefault } = require("./start/flowDefault");

const flow = createFlow(
    [
        flowPrincipal,
        flowSecundario,
        flowDefault
    ]
);

module.exports = { flow };