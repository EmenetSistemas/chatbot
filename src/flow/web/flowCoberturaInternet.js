const { addKeyword } = require("@bot-whatsapp/bot");

const { normalizeString, obtenerZonasCobertura } = require("../../services/web.service");

const flowCoberturaInternet = addKeyword('2', { sensitive: true })
    .addAnswer('🤖 ¿Qué te gustaría hacer?')
    .addAnswer(
        [
            '',
            '- Coloque el nombre de su localidad para validar la cobertura en su domicilio',
            '- *Menu* para volver al menú principal'
        ],
        { capture: true },
        async ({ body }, { flowDynamic, fallBack, gotoFlow }) => {
            const input = normalizeString(body);

            if (input == 'menu') {
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            const coberturas = await obtenerZonasCobertura(input);

            if (coberturas.responseType == 3) {
                await flowDynamic([
                    'No indetifico tú localidad, puedes intentar de nuevo verificando errores de escritura'
                ]);
            }

            if (coberturas.responseType == 2) {
                await flowDynamic([
                    'No indetifico tú localidad, pero encontre localidades similares.\nPuedes colocar de nuevo tú la localidad si es que se encuentra en el siguiente listado:',
                    coberturas.mensaje
                ]);
            }

            if (coberturas.responseType == 1) {
                await flowDynamic(coberturas.mensaje);
                const { flowSecundario } = require("../start/flowSecundario");
                return await gotoFlow(flowSecundario);
            }

            return fallBack();
        }
    )

module.exports = { flowCoberturaInternet };