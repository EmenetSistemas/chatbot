const { default: axios } = require("axios");

const api = 'https://chatbot-back.galasoftsolutions.com/api/';

const validarSesion = async (telefono, respuesta = false) => {
    await axios.get(`${api}chats/validarSesion/${telefono}`)
        .then(response => {
            respuesta = response.data.data;
        })
        .catch(error => {
            console.log(error);
        });

    return respuesta;
};

const reactivarSesion = async (telefono, respuesta = false) => {
    await axios.get(`${api}chats/eliminarChatBlackList/${telefono}`)
    .then(response => {
        respuesta = true;
    })
    .catch(error => {
        console.log(error);
    });

    return respuesta;
}

const registrarSolicitudInstalacion = async (data, errorPeticion = false) => {
    await axios.post(`${api}chats/registrarSolicitudInstalacion`, data)
        .then(response => {
            errorPeticion = false;
        })
        .catch(error => {
            errorPeticion = true;
            console.log(error);
        });
    return errorPeticion;
};

const registrarComprobantePago = async (data, errorPeticion = false) => {
    await axios.post(`${api}comprobantesPago/capturaComprobantePago`, data)
        .then(response => {
            errorPeticion = false;
        })
        .catch(error => {
            errorPeticion = true;
            console.log(error);
        });
    return errorPeticion;
};

const detectFileType = (base64Data) => {
    const header = base64Data.substring(0, 16);

    const fileTypePatterns = {
        'application/pdf': /^JVBERi/, // PDF
        'image/jpeg': /^\/9j\/|^JVBER/, // JPEG
        'image/png': /^iVBORw/, // PNG
        'image/webp': /^UklGR/, // WebP
        'image/bmp': /^Qk0=/, // BMP
        'image/tiff': /^SUkqAA/, // TIFF
        'image/vnd.adobe.photoshop': /^8BPS/, // Photoshop PSD
        'image/svg+xml': /^PHN2Z/, // SVG
        'image/jpeg': /^\/9j\/|^JVBER/, // JPEG
        'image/png': /^iVBORw/, // PNG
    };

    for (const [type, pattern] of Object.entries(fileTypePatterns)) {
        if (pattern.test(header)) {
            return type;
        }
    }

    return 'unknown';
};

module.exports = {
    registrarComprobantePago,
    detectFileType,
    validarSesion,
    reactivarSesion,
    registrarSolicitudInstalacion
};