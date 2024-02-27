const { createFlow } = require("@bot-whatsapp/bot");

const { flowPrincipal } = require("./start/flowPrincipal");

const flow = createFlow(
    [
        flowPrincipal
    ]
);

module.exports = { flow };