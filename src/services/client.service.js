const { default: axios } = require("axios");

const api = 'https://chatbot-back.galasoftsolutions.com/api/';

const registrarComprobantePago = async (data, errorPeticion = false) => {
    await axios.post(api+'comprobantesPago/capturaComprobantePago', data)
        .then(response => {
            errorPeticion = false;
        })
        .catch(error => {
            errorPeticion = true;
        });
    return errorPeticion;
}

module.exports = { registrarComprobantePago };