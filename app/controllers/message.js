const { provider } = require("../src/shared/provider");

async function enviarMensajeTexto(req, res) {
    const abc = await provider.getInstance();
    await abc.sendMessage(req.body.telefono+'@c.us', { text: req.body.mensaje });

    res.status(200).send({
        message : 'Se envió el mensaje con éxito'
    });
}

/*const abc = await provider.getInstance();
await abc.sendMessage(ctx.key.remoteJid, { text: 'hola' }, { quoted: ctx });*/

module.exports = {
    enviarMensajeTexto
};