const { addKeyword } = require("@bot-whatsapp/bot");

const flowContratacion = addKeyword(['si', 'contratacion'])
    .addAnswer([
        'Te solicitaré un par de datos necesarios para poder continuar con este proceso',
        '',
        '❌ Si deseas cancelar este proceso lo puedes hacer en cualquier momento escribiendo la palabra *cancelar*'
    ])

module.exports = { flowContratacion };