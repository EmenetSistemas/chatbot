const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const { validarSesion } = require("../../services/client.service");
const { normalizeString, obtenerSaludo } = require("../../services/web.service");
const { flujosPrincipales, obtenerOpcionesFlujoPrincipal } = require("../../services/generic.service");

const keywords = ['hola', 'menu', 'buenas', 'buenos'];

const flowDefault = addKeyword(EVENTS.WELCOME)
    .addAction(
        async (ctx, { flowDynamic, endFlow, provider }) => {
            const status = await validarSesion(ctx.from);

            if (status) {
                return await endFlow();
            }

            const abc = await provider.getInstance();
            await abc.readMessages([ctx.key]);
            await abc.chatModify({ archive: true, lastMessages: [ctx] }, ctx.key.remoteJid);

            const input = normalizeString(ctx.body);

            return await (!keywords.some(keyword => input.includes(keyword))) ? flowDynamic('Eso no lo se :(') : flowDynamic(`🙌 Hola ${obtenerSaludo()}, bienvenido al 🤖 chatbot de *Emenet*`);
        }
    )
    .addAnswer(
        [
            `🤖 ¿En que puedo ayudarte el día de hoy?\n${obtenerOpcionesFlujoPrincipal()}`
        ],
        { capture: true },
        async ({ body }, { flowDynamic, fallBack }) => {
            const input = await normalizeString(body);
            const keywords = await flujosPrincipales.map(item => item.ctx.keyword).flat();

            const validate = await keywords.some(keyword => {
                return input.split(' ').some(pInput => pInput === keyword);
            });

            if (!validate) {
                await flowDynamic('Se debe colocar una opción válida');
                return await fallBack();
            }
        },
        flujosPrincipales
    )

const flowDefault1 = addKeyword(EVENTS.MEDIA)
    .addAction(
        async (ctx, { endFlow, provider }) => {
            const abc = await provider.getInstance();
            await abc.readMessages([ctx.key]);
            await abc.chatModify({ archive: true, lastMessages: [ctx] }, ctx.key.remoteJid);

            const status = await validarSesion(ctx.from);

            if (status) {
                return endFlow();
            }
        }
    )
    .addAction(
        async (ctx, { provider }) => {
            if (ctx.message.stickerMessage) {
                const numeroAleatorio = Math.floor(Math.random() * 7) + 1;
                const urlImagen = `https://galasoftsolutions.com/img/img${numeroAleatorio}.png`;
                await provider.sendSticker(ctx.from + '@c.us', urlImagen, { pack: 'User', author: 'Me' });
                return;
            }
        }
    )

module.exports = { flowDefault, flowDefault1 };