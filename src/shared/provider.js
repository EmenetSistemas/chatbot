const BaileysProvider = require('@bot-whatsapp/provider/baileys')

const { createProvider } = require("@bot-whatsapp/bot");

const provider = createProvider(BaileysProvider);

module.exports = { provider };