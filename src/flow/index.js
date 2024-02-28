const { createFlow } = require("@bot-whatsapp/bot");

const { flowPrincipal } = require("./start/flowPrincipal");
const { flowSecundario } = require("./start/flowSecundario");

const flow = createFlow(
    [
        flowPrincipal,
        flowSecundario
    ]
);

module.exports = { flow };