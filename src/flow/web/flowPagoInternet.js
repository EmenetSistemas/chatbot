const { addKeyword } = require("@bot-whatsapp/bot");
const { crearMensajeConBotones } = require("../../services/generic.service");

const flowPagoInternet = addKeyword('4', { sensitive: true })
    .addAnswer([
        '🤖❗*Importante*❗',
        '',
        '- *Las fechas de pago del servicio son del 1 al 5 de cada mes*',
        '- *En caso de presentar atrazos de pago del servicio, si se desea continuar o cancelar el mismo, antes se deberá poner al corriente con los pagos faltantes*',
        '',
        'Para que pueda realizar el pago de su servicio contamos con las siguientes opciones de pago:'
    ])
    .addAction(
        async ({ from }, { flowDynamic }) => {
            const buttons = [
                { textoBoton: '📍 Santiago Tianguistengo', url: 'https://www.google.com/maps/place/M-net+Sistemas+Computadoras+e+Internet/@19.1815901,-99.4671439,3a,75y,78.3h,86.93t/data=!3m7!1e1!3m5!1sUKCNPaFNuh5wZ1P7kB9A-A!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DUKCNPaFNuh5wZ1P7kB9A-A%26cb_client%3Dmaps_sv.tactile.gps%26w%3D203%26h%3D100%26yaw%3D79.85321%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192!4m7!3m6!1s0x85cdf3d2a5c1d91f:0x59b36638210c9c11!8m2!3d19.1816993!4d-99.4668363!10e5!16s%2Fg%2F11c6112plc?entry=ttu' },
                { textoBoton: '📍 Santa Monica', url: 'https://www.google.es/maps/@18.9911785,-99.4212856,3a,75y,100.03h,88.05t/data=!3m7!1e1!3m5!1syoc9fPrJqVqyIn-l8xo1yg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3Dyoc9fPrJqVqyIn-l8xo1yg%26cb_client%3Dmaps_sv.tactile.gps%26w%3D203%26h%3D100%26yaw%3D124.89158%26pitch%3D0%26thumbfov%3D100!7i16384!8i8192?entry=ttu' }
            ];
            await crearMensajeConBotones(from, '🌎 *Pago directo en sucursales autorizadas*', buttons);
            return await flowDynamic('🧑🏻‍💻 *Pago en ventanilla Banco Azteca o transferencia desde cualquier banco*');
        }
    )
    .addAnswer(
        [
            'No. Cuenta:',
            '02431354972589',
            '',
            'CLABE:',
            '12 7180 0135 4972 5898'
        ],
        { media: 'https://galasoftsolutions.com/datosCuenta.jpg' }
    )

module.exports = { flowPagoInternet };