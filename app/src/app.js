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
        blackList: []
    });

    app.get("/get-qr", async (_, res) => {
        const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
        const fileStream = createReadStream(YOUR_PATH_QR);

        res.writeHead(200, { "Content-Type": "image/png" });
        fileStream.pipe(res);
    });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
}

main();