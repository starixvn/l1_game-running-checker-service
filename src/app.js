import Fastify from "fastify";
import { initPlayer } from "./runners/player-initializer";
import { findPlayer } from "./runners/players";
import { bet } from "./handlers/bet-handler";
import { post, init } from "./auths/authentication-helpers";
import config from "./app-configs";
import { convertBetChoice } from "./helpers/convert-bet-choice";

const fastify = Fastify({
    logger: true,
    ignoreDuplicateSlashes: true,
    requestTimeout: 60,
});

fastify.get("/", async (request, reply) => {
    reply.code(200).send("Hello, I'm AutoBot");
});

fastify.post("/bet", async (request, reply) => {
    const { player, betInfo, gameName } = request.body;

    const gameInfo = {
        name: gameName,
        proxyRoute: `/${gameName.toLocaleLowerCase()}/socket.io`,
    };

    const result = await bet(player, gameInfo, betInfo);

    reply.code(200).send(result);
});

fastify.post("/create-player", async (request, reply) => {
    const { currency } = request.body;
    const player = findPlayer(currency, config.system);
    await initPlayer(player.id, player.nickname, player.currency);
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 5000, host: "0.0.0.0" });

        console.log(`AutoBot started at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    } catch (err) {
        fastify.log.error(err);
        console.log(err);
        process.exit(1);
    }
};

start();
