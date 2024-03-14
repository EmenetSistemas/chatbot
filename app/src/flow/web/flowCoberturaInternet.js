const { addKeyword } = require("@bot-whatsapp/bot");

const { normalizeString, obtenerZonasCobertura } = require("../../services/web.service");

const flowCoberturaInternet = addKeyword('2', { sensitive: true })
    .addAnswer(
        [
            '🤖 ¿Cuál es la localidad donde se encuentra su domicilio?'
        ],
        { capture: true },
        async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
            const input = normalizeString(ctx.body);
            const coberturas = await obtenerZonasCobertura(input);

            if (coberturas.responseType == 3) {
                await flowDynamic([
                    '🤖 No indetifico tú localidad, puedes intentar de nuevo verificando errores de escritura'
                ]);
            }

            if (coberturas.responseType == 2) {
                await flowDynamic([
                    '🤖 No indetifico tú localidad, pero encontre localidades similares:',
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