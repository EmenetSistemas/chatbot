const { default: axios } = require("axios");

const { flowConsultaPlanes } = require("../flow/web/flowConsultaPlanes");
const { flowCoberturaInternet } = require("../flow/web/flowCoberturaInternet");
const { flowContratacion } = require("../flow/web/flowContratacion");
const { flowPagoInternet } = require("../flow/web/flowPagoInternet");
const { flowRegistrarComprobantePago } = require("../flow/client/flowRegistrarComprobantePago");
const { flowContacto } = require("../flow/client/flowContacto");

const flujosPrincipales = [
    flowConsultaPlanes,
    flowCoberturaInternet,
    flowContratacion,
    flowPagoInternet,
    flowRegistrarComprobantePago,
    flowContacto
];

const obtenerOpcionesFlujoPrincipal = () => {
    const opciones = [
        '    *1.* Ver planes de internet 📑',
        '    *2.* Validar cobertura 🌎',
        '    *3.* Contratar servicio internet 🧑🏻‍💻',
        '    *4.* Realizar pago de servicio 💵',
        '    *5.* Enviar comprobante de pago 📸',
        '    *6.* Contactar con un asesor ☎️',
        '',
        'Visita nuestra página:\nhttps://m-net.mx/',
        'Realice un test de velicidad:\nhttps://emenet.m-net.mx/inicio#team'
    ];

    const opcionesConSaltoInicial = [''].concat(opciones);

    return opcionesConSaltoInicial.join('\n');
};

const capturarImagen = async (url) => {
    console.log('entró');
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        const base64Data = Buffer.from(response.data, 'binary').toString('base64');

        return base64Data;
    } catch (error) {
        return null;
    }
};

module.exports = {
    flujosPrincipales,
    obtenerOpcionesFlujoPrincipal,
    capturarImagen
};