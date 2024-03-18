const { createFlow } = require("@bot-whatsapp/bot");

const { flowPrincipal } = require("./start/flowPrincipal");
const { flowDefault, flowDefault1 } = require("./start/flowDefault");
const { flowSecundario } = require("./start/flowSecundario");

const flow = createFlow(
    [
        flowPrincipal,
        flowSecundario,
        flowDefault,
        flowDefault1
    ]
);

module.exports = { flow };