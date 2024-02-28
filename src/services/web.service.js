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

const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s]/gi, '').replace(/ñ/g, 'n');
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

const obtenerZonasCobertura = async (input) => {
    const inputNormalized = normalizeString(input);
    const palabrasInput = inputNormalized.split(' ');

    const cobertura = [
        {comunidad: 'Acazulco'},
        {comunidad: 'Agua Blanca'},
        {comunidad: 'Ahuatenco'},
        {comunidad: 'Ahuehuete'},
        {comunidad: 'Almaya'},
        {comunidad: 'Almoloya del Río'},
        {comunidad: 'Amate (Cuernavaca)'},
        {comunidad: 'Arcos'},
        {comunidad: 'Atlantlacpac'},
        {comunidad: 'Atlantlalpac'},
        {comunidad: 'Atlapulco'},
        {comunidad: 'Calimaya'},
        {comunidad: 'Capulhuac'},
        {comunidad: 'Chapultepec'},
        {comunidad: 'Civac Los Robles (Cuernavaca)'},
        {comunidad: 'Coamilpa'},
        {comunidad: 'Coatepec centro'},
        {comunidad: 'Colonia Libertad'},
        {comunidad: 'Colonia San Isidro'},
        {comunidad: 'Coyoltepec'},
        {comunidad: 'Cuernavaca'},
        {comunidad: 'El Guarda'},
        {comunidad: 'El Mirasol'},
        {comunidad: 'El Pedregal'},
        {comunidad: 'El Potrero'},
        {comunidad: 'Ex-hacienda de Atenco'},
        {comunidad: 'Fracc. Buen Suceso'},
        {comunidad: 'Gualupita'},
        {comunidad: 'Gustavo Baz'},
        {comunidad: 'Ixtlahuaca Emiliano Zapata'},
        {comunidad: 'Ixtlahuaca G. Cachi'},
        {comunidad: 'Ixtlahuaca San Jerónimo Ixtapatongo'},
        {comunidad: 'Ixtlahuaca San Joaquín'},
        {comunidad: 'Ixtlahuaca San Mateo'},
        {comunidad: 'Ixtlahuaca Santo Domingo'},
        {comunidad: 'Joquicingo'},
        {comunidad: 'La Esperanza'},
        {comunidad: 'La Florida'},
        {comunidad: 'La Marquesa'},
        {comunidad: 'La Pastoría'},
        {comunidad: 'Lagunilla Chalma'},
        {comunidad: 'Lagunilla Tlazala'},
        {comunidad: 'Llano del Compromiso'},
        {comunidad: 'Lomas de Teocaltzingo'},
        {comunidad: 'Maxtleca'},
        {comunidad: 'Meztitla'},
        {comunidad: 'Morelos'},
        {comunidad: 'Ocotenco'},
        {comunidad: 'Ocoyoacac'},
        {comunidad: 'Ocuilan'},
        {comunidad: 'Paseos del Río'},
        {comunidad: 'San Bartolo'},
        {comunidad: 'San Francisco Tepexoxuca'},
        {comunidad: 'San José Mezapa'},
        {comunidad: 'San Juan Atzingo'},
        {comunidad: 'San Lorenzo'},
        {comunidad: 'San Lorenzo Huehuetitlán'},
        {comunidad: 'San Miguel de Ocampo'},
        {comunidad: 'San Nicolás Coatepec'},
        {comunidad: 'San Pedro Cholula'},
        {comunidad: 'San Pedro Techuchulco'},
        {comunidad: 'San Pedro Tlaltizapán'},
        {comunidad: 'Santa Ana'},
        {comunidad: 'Santa Cruz Atizapán'},
        {comunidad: 'Santa Fe Mezapa'},
        {comunidad: 'Santa Lucía'},
        {comunidad: 'Santa María Coaxusco'},
        {comunidad: 'Santa María Jajalpa'},
        {comunidad: 'Santa Martha'},
        {comunidad: 'Santa Mónica'},
        {comunidad: 'Santiago Tianguistenco'},
        {comunidad: 'Sauces 2'},
        {comunidad: 'Sauces Cuernavaca'},
        {comunidad: 'Techmalinalli'},
        {comunidad: 'Tenango del Valle'},
        {comunidad: 'Tepetzingo'},
        {comunidad: 'Texcalyacac'},
        {comunidad: 'Tezontepec'},
        {comunidad: 'Tilapa'},
        {comunidad: 'Tlacomulco'},
        {comunidad: 'Tlacuitlapa'},
        {comunidad: 'Tlaminca'},
        {comunidad: 'Tlazala'},
        {comunidad: 'Tultepec'},
        {comunidad: 'Xalatlaco'}
    ];

    const coincidenciasExactas = cobertura.filter(({ comunidad }) => {
        const comunidadNormalized = normalizeString(comunidad);

        return comunidadNormalized == inputNormalized;
    });

    if (coincidenciasExactas.length > 0) {
        return {
            responseType : 1,
            mensaje : 'En la comunidad de '+coincidenciasExactas[0].comunidad+' si contamos con cobertura de internet, solo resta verificar la ubicación exacta de tu domicilio para que puedas agendar una instalación en tú domicilio y puedas disfrutar de nuestro exelente servicio'
        };
    }

    const coincidenciasParciales = cobertura.filter(({ comunidad }) => {
        const comunidadNormalized = normalizeString(comunidad);
        
        return palabrasInput.some(palabra => comunidadNormalized.includes(palabra));
    });

    if (coincidenciasParciales.length > 0) {
        return {
            responseType : 2,
            mensaje : formatarResultado(coincidenciasParciales)
        };
    }

    return {
        responseType : 3
    };
}

const formatarResultado = (coincidencias) => {
    return '\n'+coincidencias.map(({ comunidad }) => `- ${comunidad}`).join('\n');
}

module.exports = {
    obtenerSaludo,
    normalizeString,
    obtenerPlanesInternet,
    obtenerPlanPorId,
    obtenerZonasCobertura
};