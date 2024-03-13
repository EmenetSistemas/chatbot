const { provider } = require("../src/shared/provider");

async function enviarMensajeTexto(req, res) {
    const abc = await provider.getInstance();
    await abc.sendMessage('5217292271384@c.us', { text: 'hola' });

    res.status(200).send({
        message: 'Hola desde controlador'
    });
}

/*const abc = await provider.getInstance();
await abc.sendMessage(ctx.key.remoteJid, { text: 'hola' }, { quoted: ctx });*/

module.exports = {
    enviarMensajeTexto
};