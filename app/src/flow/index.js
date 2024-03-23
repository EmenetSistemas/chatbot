const { createFlow } = require("@bot-whatsapp/bot");

const { flowDefault, flowDefault1 } = require("./start/flowDefault");
const { flowSecundario } = require("./start/flowSecundario");
const { flowOptions } = require("./start/flowOptions");

const flow = createFlow(
    [
        flowSecundario,
        flowOptions,
        flowDefault,
        flowDefault1
    ]
);

module.exports = { flow };