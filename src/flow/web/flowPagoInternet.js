const { addKeyword } = require("@bot-whatsapp/bot");
const { crearMensajeConBotones } = require("../../services/generic.service");

const flowPagoInternet = addKeyword('4', { sensitive: true })
    .addAnswer([
        '🤖❗*Importante*❗',
        '',
        '- *Las fechas de pago del servicio son del 1 al 5 de cada mes*',
        '- *En caso de presentar atrazos de pago del servicio, si se desea continuar o cancelar el mismo, antes se deberá poner al corriente con los pagos faltantes*',
        '',
        'Para que pueda realizar el pago de su servicio contamos con las siguientes opciones:'
    ])
    .addAnswer(
        '🌎 *Pago directo en sucursales autorizadas*',
        null,
        async ({ from }, { flowDynamic, provider }) => {
            const abc = await provider.getInstance();
            await flowDynamic('📍 Santiago Tianguistenco');
            await abc.sendMessage(
                from + '@c.us',
                { location: { degreesLatitude: 19.1815901, degreesLongitude: -99.4671439 } }
            );
            await flowDynamic('📍 Santa Monica');
            await abc.sendMessage(
                from + '@c.us',
                { location: { degreesLatitude: 18.9911785, degreesLongitude: -99.4212856 } }
            );
            return await flowDynamic('🧑🏻‍💻 *Pago en ventanilla Banco Azteca o transferencia desde cualquier banco*');
        }
    )
    .addAnswer(
        [
            'No. Cuenta:',
            '02431354972589',
            '',
            'CLABE:',
            '12 7180 0135 4972 5898',
            '',
            '🤖 Si se realiza el pago por transferencia o pago en ventanilla es necesario enviar por este medio una 📸 captura/foto del comprobante de pago, colocando además a nombre de quien está el servicio 👤'
        ],
        { media: 'https://galasoftsolutions.com/datosCuenta.jpg' }
    )

module.exports = { flowPagoInternet };