const { createFlow } = require("@bot-whatsapp/bot");

const { flowDefault, flowDefault1 } = require("./start/flowDefault");
const { flowSecundario } = require("./start/flowSecundario");

const flow = createFlow(
    [
        flowSecundario,
        flowDefault,
        flowDefault1
    ]
);

module.exports = { flow };