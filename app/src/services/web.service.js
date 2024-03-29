const { default: axios } = require("axios");

const url = 'https://prueba.m-net.mx/public/api/';

const zonas = [
    {
        indice: 1,
        comunidad: 'Acazulco'
    }, {
        indice: 2,
        comunidad: 'Agua Blanca'
    }, {
        indice: 4,
        comunidad: 'Ahuatenco'
    }, {
        indice: 70,
        comunidad: 'Ahuehuete'
    }, {
        indice: 46,
        comunidad: 'Almaya'
    }, {
        indice: 45,
        comunidad: 'Almoloya del Río'
    }, {
        indice: 47,
        comunidad: 'Amate (Cuernavaca)'
    }, {
        indice: 55,
        comunidad: 'Arcos'
    }, {
        indice: 62,
        comunidad: 'Atlantlacpac'
    }, {
        indice: 6,
        comunidad: 'Atlantlalpac'
    }, {
        indice: 5,
        comunidad: 'Atlapulco'
    }, {
        indice: 57,
        comunidad: 'Calimaya'
    }, {
        indice: 10,
        comunidad: 'Capulhuac'
    }, {
        indice: 65,
        comunidad: 'Chapultepec'
    }, {
        indice: 7,
        comunidad: 'Civac Los Robles (Cuernavaca)'
    }, {
        indice: 11,
        comunidad: 'Coamilpa'
    }, {
        indice: 63,
        comunidad: 'Coatepec centro'
    }, {
        indice: 72,
        comunidad: 'Colonia Libertad'
    }, {
        indice: 74,
        comunidad: 'Colonia San Isidro'
    }, {
        indice: 8,
        comunidad: 'Coyoltepec'
    }, {
        indice: 3,
        comunidad: 'Cuernavaca'
    }, {
        indice: 79,
        comunidad: 'El Guarda'
    }, {
        indice: 13,
        comunidad: 'El Mirasol'
    }, {
        indice: 14,
        comunidad: 'El Pedregal'
    }, {
        indice: 15,
        comunidad: 'El Potrero'
    }, {
        indice: 71,
        comunidad: 'Ex-hacienda de Atenco'
    }, {
        indice: 16,
        comunidad: 'Fracc. Buen Suceso'
    }, {
        indice: 17,
        comunidad: 'Gualupita'
    }, {
        indice: 12,
        comunidad: 'Gustavo Baz'
    }, {
        indice: 75,
        comunidad: 'Ixtlahuaca Emiliano Zapata'
    }, {
        indice: 78,
        comunidad: 'Ixtlahuaca G. Cachi'
    }, {
        indice: 85,
        comunidad: 'Ixtlahuaca San Jerónimo Ixtapatongo'
    }, {
        indice: 84,
        comunidad: 'Ixtlahuaca San Joaquín'
    }, {
        indice: 76,
        comunidad: 'Ixtlahuaca San Mateo'
    }, {
        indice: 73,
        comunidad: 'Ixtlahuaca Santo Domingo'
    }, {
        indice: 82,
        comunidad: 'Joquicingo'
    }, {
        indice: 21,
        comunidad: 'La Esperanza'
    }, {
        indice: 58,
        comunidad: 'La Florida'
    }, {
        indice: 18,
        comunidad: 'La Marquesa'
    }, {
        indice: 22,
        comunidad: 'La Pastoría'
    }, {
        indice: 19,
        comunidad: 'Lagunilla Chalma'
    }, {
        indice: 20,
        comunidad: 'Lagunilla Tlazala'
    }, {
        indice: 53,
        comunidad: 'Llano del Compromiso'
    }, {
        indice: 52,
        comunidad: 'Lomas de Teocaltzingo'
    }, {
        indice: 83,
        comunidad: 'Maxtleca'
    }, {
        indice: 61,
        comunidad: 'Meztitla'
    }, {
        indice: 23,
        comunidad: 'Morelos'
    }, {
        indice: 59,
        comunidad: 'Ocotenco'
    }, {
        indice: 24,
        comunidad: 'Ocoyoacac'
    }, {
        indice: 68,
        comunidad: 'Ocuilan'
    }, {
        indice: 54,
        comunidad: 'Paseos del Río'
    }, {
        indice: 28,
        comunidad: 'San Bartolo'
    }, {
        indice: 81,
        comunidad: 'San Francisco Tepexoxuca'
    }, {
        indice: 34,
        comunidad: 'San José Mezapa'
    }, {
        indice: 27,
        comunidad: 'San Juan Atzingo'
    }, {
        indice: 26,
        comunidad: 'San Lorenzo'
    }, {
        indice: 36,
        comunidad: 'San Lorenzo Huehuetitlán'
    }, {
        indice: 80,
        comunidad: 'San Miguel de Ocampo'
    }, {
        indice: 50,
        comunidad: 'San Nicolás Coatepec'
    }, {
        indice: 9,
        comunidad: 'San Pedro Cholula'
    }, {
        indice: 66,
        comunidad: 'San Pedro Techuchulco'
    }, {
        indice: 32,
        comunidad: 'San Pedro Tlaltizapán'
    }, {
        indice: 25,
        comunidad: 'Santa Ana'
    }, {
        indice: 51,
        comunidad: 'Santa Cruz Atizapán'
    }, {
        indice: 48,
        comunidad: 'Santa Fe Mezapa'
    }, {
        indice: 30,
        comunidad: 'Santa Lucía'
    }, {
        indice: 77,
        comunidad: 'Santa María Coaxusco'
    }, {
        indice: 67,
        comunidad: 'Santa María Jajalpa'
    }, {
        indice: 29,
        comunidad: 'Santa Martha'
    }, {
        indice: 35,
        comunidad: 'Santa Mónica'
    }, {
        indice: 31,
        comunidad: 'Santiago Tianguistenco'
    }, {
        indice: 56,
        comunidad: 'Sauces 2'
    }, {
        indice: 44,
        comunidad: 'Sauces Cuernavaca'
    }, {
        indice: 64,
        comunidad: 'Techmalinalli'
    }, {
        indice: 49,
        comunidad: 'Tenango del Valle'
    }, {
        indice: 41,
        comunidad: 'Tepetzingo'
    }, {
        indice: 33,
        comunidad: 'Texcalyacac'
    }, {
        indice: 86,
        comunidad: 'Tezontepec'
    }, {
        indice: 38,
        comunidad: 'Tilapa'
    }, {
        indice: 40,
        comunidad: 'Tlacomulco'
    }, {
        indice: 39,
        comunidad: 'Tlacuitlapa'
    }, {
        indice: 60,
        comunidad: 'Tlaminca'
    }, {
        indice: 37,
        comunidad: 'Tlazala'
    }, {
        indice: 42,
        comunidad: 'Tultepec'
    }, {
        indice: 43,
        comunidad: 'Xalatlaco'
    }
];

const obtenerSaludo = () => {
    const horaActual = new Date().getHours();
    if (horaActual >= 5 && horaActual < 12) {
        return 'buenos días';
    } else if (horaActual >= 12 && horaActual < 18) {
        return 'buenas tardes';
    } else {
        return 'buenas noches';
    }
};

const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s]/gi, '').replace(/ñ/g, 'n');
};

const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
});

const obtenerPlanesInternetTipo = async (tipoPago) => {
    try {
        const response = await axios.get(`${url}internet/planes`);
        const objPlanes = response.data.data.planesInternet.filter(item => {
            return tipoPago === 'mensual' ? item.mensualidad : item.anualidad;
        });

        let contador = 1;
        const mensajes = '\n' + objPlanes.map(item => {
            const periodo = tipoPago === 'mensual' ? 'al mes' : 'al año';
            const pago = formatter.format(tipoPago === 'mensual' ? item.mensualidad : item.anualidad);
            const mensaje = `${contador}. *${item.plan}* x *${pago}* ${periodo}`;
            contador++;
            return mensaje;
        }).join('\n');

        return [
            mensajes,
            'El costo base de instalación es de 💵 $500.00 pesos, el aumento del mismo va depender de la distancia de la caja más cercana hasta su domicilio 📍'
        ];
    } catch (error) {
        return 'Upss...! Ocurrió un error inesperado, por favor intenta nuevamente';
    }
};


const obtenerPlanPorIdentificador = async (tipoPago, indice) => {
    try {
        const response = await axios.get(`${url}internet/planes`);
        const objPlanes = response.data.data.planesInternet.filter(item => {
            return tipoPago == '1' ? item.mensualidad : item.anualidad;
        });

        const planSeleccionado = objPlanes[indice - 1];

        if (!planSeleccionado) return null;

        const periodo = tipoPago == '1' ? 'al mes' : 'al año';
        const servicios = planSeleccionado.caracteristicas.map((element, index) => `    ${index + 1}. ${element.nombre}`).join('\n');
        const pago = formatter.format(tipoPago == '1' ? planSeleccionado.mensualidad : planSeleccionado.anualidad);

        const mensaje = `*Plan seleccionado:* 🛜\n- ${(planSeleccionado.tipoPlan == 1 ? 'P#' : 'PQ#') + planSeleccionado.pkTblPlan} - (*${planSeleccionado.plan}* x *${pago}* ${periodo})\n\n*Servicios:* 📋\n${servicios}\n\n*Recomendaciones:* ✔️\n- Dispositivos conectados simultaneamente: *${planSeleccionado.dispositivosSimultaneos}*\n- Estudio / trabajo en casa simultáneamente: *${planSeleccionado.estudioTrabajo}*\n- Reproducción de video: *${planSeleccionado.reproduccionVideo}*\n- Juego en línea: *${planSeleccionado.juegoLinea}*\n- Transmisiones en vivo: *${planSeleccionado.transmisiones}*`;

        return {
            mensaje,
            pkTblPlan: planSeleccionado.pkTblPlan
        };
    } catch (error) {
        return 'Upss...! Ocurrió un error inesperado, por favor intenta nuevamente';
    }
};


const obtenerZonasCobertura = async (input) => {
    const inputNormalized = normalizeString(input);

    const indiceInput = parseInt(input);
    const comExac = zonas.find(item => item.indice === indiceInput);
    if (!isNaN(indiceInput) && comExac) {
        return {
            responseType: 1,
            comunidad: comExac.comunidad,
            mensaje: `En la comunidad de 🌎 ${comExac.comunidad} sí contamos con cobertura de internet 🛜\n🧑🏻‍💻 Solo recuerde que aún hay que verificar la ubicación exacta de su domicilio para que pueda agendar una instalación y disfrutar de nuestro excelente servicio.`
        };
    }

    const zonasOrdenadas = zonas.sort((a, b) => {
        return a.indice - b.indice;
    });

    const coincidenciasExactas = zonasOrdenadas.filter(({ comunidad }) => normalizeString(comunidad) === inputNormalized);
    if (coincidenciasExactas.length > 0) {
        return {
            responseType: 1,
            comunidad: coincidenciasExactas[0].comunidad,
            mensaje: `En la comunidad de 🌎 ${coincidenciasExactas[0].comunidad} sí contamos con cobertura de internet 🛜\n🧑🏻‍💻 Solo recuerde que aún hay que verificar la ubicación exacta de su domicilio para que pueda agendar una instalación y disfrutar de nuestro excelente servicio.`
        };
    }

    const palabrasInput = inputNormalized.split(' ');
    const coincidenciasParciales = zonasOrdenadas.filter(({ comunidad }) => {
        return palabrasInput.some(palabra => {
            const interZona = normalizeString(comunidad).split(' ');
            return interZona.some(pComuni => pComuni === palabra);
        });
    });
    if (coincidenciasParciales.length > 0) {
        if (coincidenciasParciales.length == 1) {
            return {
                responseType: 1,
                comunidad: coincidenciasParciales[0].comunidad,
                mensaje: `En la comunidad de 🌎 ${coincidenciasParciales[0].comunidad} sí contamos con cobertura de internet 🛜\n🧑🏻‍💻 Solo recuerde que aún hay que verificar la ubicación exacta de su domicilio para que pueda agendar una instalación y disfrutar de nuestro excelente servicio.`
            };
        }
        return {
            responseType: 2,
            mensaje: formatarResultado(coincidenciasParciales),
            zonasTemp: coincidenciasParciales
        };
    }

    return {
        responseType: 3
    };
};

const formatarResultado = (coincidencias) => {
    return '\n' + coincidencias.map((item) => `${item.indice}. ${item.comunidad}`).join('\n');
};

module.exports = {
    obtenerSaludo,
    normalizeString,
    obtenerPlanesInternetTipo,
    obtenerPlanPorIdentificador,
    obtenerZonasCobertura
};