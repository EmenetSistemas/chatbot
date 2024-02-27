const { default: axios } = require("axios");

const url = 'https://prueba.m-net.mx/public/api/';

const obtenerSaludo = () => {
    const horaActual = new Date().getHours();
    if (horaActual >= 5 && horaActual < 12) {
        return 'buenos días';
    } else if (horaActual >= 12 && horaActual < 18) {
        return 'buenas tardes';
    } else {
        return 'buenas noches';
    }
}

const obtenerPlanesInternet = async () => {
    try {
        const response = await axios.get(`${url}internet/planes`);
        const objPlanes = response.data.data.planesInternet;

        const mensajes = '\n'+objPlanes.map(item => {
            const periodo = item.mensualidad ? 'al mes' : 'al año';
            return `${item.pkTblPlan}. *${item.plan}* x *${item.mensualidad ?? item.anualidad}* ${periodo}`;
        }).join('\n');

        return mensajes;
    } catch (error) {
        return 'Upss...! Ocurrió un error inesperado, por favor intenta nuevamente';
    }
};

const obtenerPlanPorId = async (id) => {
    try {
        const response = await axios.get(`${url}internet/planes`);
        const objPlanes = response.data.data.planesInternet;

        const planEncontrado = objPlanes.find(plan => plan.pkTblPlan == id);

        if (!planEncontrado) {
            return null;
        }

        const periodo = planEncontrado.mensualidad ? 'al mes' : 'al año';
        const servicios = planEncontrado.caracteristicas.map((element, index) => `    ${index + 1}. ${element.nombre}`).join('\n');

        const mensaje = `*Plan seleccionado:*\n- ${(planEncontrado.tipoPlan == 1 ? 'P#' : 'PQ#') + planEncontrado.pkTblPlan} - (*${planEncontrado.plan}* x *${planEncontrado.mensualidad ?? planEncontrado.anualidad}* ${periodo})\n\n*Servicios:*\n${servicios}\n\n*Recomendaciones:*\n- Dispositivos conectados simultaneamente: *${planEncontrado.dispositivosSimultaneos}*\n- Estudio / trabajo en casa simultáneamente: *${planEncontrado.estudioTrabajo}*\n- Reproducción de video: *${planEncontrado.reproduccionVideo}*\n- Juego en línea: *${planEncontrado.juegoLinea}*\n- Transmisiones en vivo: *${planEncontrado.transmisiones}*`;

        return mensaje;
    } catch (error) {
        return 'Upss...! Ocurrió un error inesperado, por favor intenta nuevamente';
    }
};

module.exports = { obtenerSaludo, obtenerPlanesInternet, obtenerPlanPorId };