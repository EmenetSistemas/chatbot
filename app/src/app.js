const { createBot } = require('@bot-whatsapp/bot');
const MockAdapter = require('@bot-whatsapp/database/mock');
const QRPortalWeb = require('@bot-whatsapp/portal');

const { flow } = require('./flow');
const { provider } = require('./shared/provider');

const express = require("express");
const router = require('../routes/api');

const main = async () => {
    const app = express();
    app.use('/api', router);
    
    await createBot({
        flow,
        provider,
        database: new MockAdapter()
    }, {
        blackList:[]
    });
    
    QRPortalWeb();
    const PORT = 4000;
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

main();