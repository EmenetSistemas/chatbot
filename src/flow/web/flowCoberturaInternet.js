const { addKeyword } = require("@bot-whatsapp/bot");

const { normalizeString, obtenerZonasCobertura } = require("../../services/web.service");

const flowCoberturaInternet = addKeyword(['2', 'cobertura'])
    .addAnswer('¿Qué te gustaría hacer?')
    .addAnswer(
        [
            '',
            '- Coloque el nombre de su localidad para validar la cobertura en su domicilio',
            '- *Menu* para volver al menú principal'
        ],
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
            const input = normalizeString(body);

            if (input == 'menu') {
                const { flowPrincipal } = require("../start/flowPrincipal");
                return await gotoFlow(flowPrincipal);
            }

            const coberturas = await obtenerZonasCobertura(input);

            if (coberturas.responseType == 3) {
                await flowDynamic([
                    'Upss..! Al parecer aúm no contamos con servicio en tu localidad'
                ]);
            }

            if (coberturas.responseType == 2) {
                await flowDynamic([
                    'No indetifico tú localidad, pero encontre localidades similares.\nPuedes colocar de nuevo tú la localidad si es que se encuentra en el siguiente listado:',
                    coberturas.mensaje
                ]);
            }

            if (coberturas.responseType == 1) {
                return flowDynamic([
                    coberturas.mensaje,
                    '¿Te gustaría conctactar con un asesor para contratar internet? *(si/no)*'
                ]);
            }

            return fallBack();
        }
    )
    .addAction(async(ctx) => {

        console.log(`Enviar un mail con el con el numero de la persona: ${ctx.from}`)
        
    })

module.exports = { flowCoberturaInternet };