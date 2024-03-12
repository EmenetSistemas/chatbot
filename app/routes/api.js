const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/message');

router.get('/enviarMensajeTexto', MessageController.enviarMensajeTexto);

module.exports = router;