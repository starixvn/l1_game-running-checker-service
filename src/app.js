import Fastify from "fastify";
import { bet } from "./handlers/bet-handler";
import { openGames, openGame } from "./handlers/open-game";

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

fastify.post("/open-game", async (request, reply) => {
    const { player, gameName } = request.body;

    const gameInfo = {
        name: gameName,
        proxyRoute: `/${gameName.toLocaleLowerCase()}/socket.io`,
    };

    const result = await openGame(player, gameInfo);

    reply.code(200).send(result);
});

fastify.post("/open-games", async (request, reply) => {
    const { player, games } = request.body;

    const result = await openGames(player, games);

    reply.code(200).send(result);
});

fastify.post("/open-all-games", async (request, reply) => {
    const { player } = request.body;

    const result = await openGames(player);

    reply.code(200).send(result);
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
