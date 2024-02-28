const { createBot, createProvider } = require('@bot-whatsapp/bot')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const QRPortalWeb = require('@bot-whatsapp/portal')

const { flow } = require('./flow')

const main = async () => {
    await createBot({
        flow,
        provider: createProvider(BaileysProvider),
        database: new MockAdapter()
    }, {
        blackList:[]
    })
    
    QRPortalWeb()
}

main()