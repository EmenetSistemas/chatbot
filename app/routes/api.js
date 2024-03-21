const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/message');
const QrController = require('../controllers/qr');

router.get('/enviarMensajeTexto', MessageController.enviarMensajeTexto);
router.get('/obtenerQr', QrController.obtenerQr);

module.exports = router;