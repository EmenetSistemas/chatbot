const { createBot } = require('@bot-whatsapp/bot')
const MockAdapter = require('@bot-whatsapp/database/mock')
const QRPortalWeb = require('@bot-whatsapp/portal')

const { provider } = require('./shared/provider')
const { flow } = require('./flow')

const main = async () => {
    await createBot({
        flow,
        provider,
        database: new MockAdapter()
    }, {
        blackList:[]
    })
    
    QRPortalWeb()
}

main()