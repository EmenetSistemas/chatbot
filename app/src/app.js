const { createBot } = require('@bot-whatsapp/bot');
const MockAdapter = require('@bot-whatsapp/database/mock');

const { flow } = require('./flow');
const { provider } = require('./shared/provider');

const bodyParser = require('body-parser');
const express = require("express");
const router = require('../routes/api');
const cors = require('cors');

const main = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors({ origin: '*' }));
    app.use('/api', router);

    await createBot({
        flow,
        provider,
        database: new MockAdapter()
    }, {
        blackList: []
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
}

main();