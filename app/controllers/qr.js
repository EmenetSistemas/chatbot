const { join } = require("path");
const { createReadStream } = require("fs");

async function obtenerQr(_, res) {
    const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
    const fileStream = createReadStream(YOUR_PATH_QR);

    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
}

module.exports = { obtenerQr };