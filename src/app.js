import Fastify from "fastify";
import { initPlayer } from "./runners/player-initializer";
import { player } from "./runners/player";
import { bet } from "./handlers/bet-handler";
import { post, init } from "./auths/authentication-helpers";
import config from "./app-configs";

const fastify = Fastify({
    logger: true,
    ignoreDuplicateSlashes: true,
    requestTimeout: 60,
});

fastify.get("/", async (request, reply) => {
    reply.code(200).send("Hello, I'm AutoBot");
});

fastify.post("/bet", async (request, reply) => {
    const { gameName, amount, betChoice, freeSpin, board } = request.body;
    const proxyRoute = `/${gameName.toLocaleLowerCase()}/socket.io`;

    const setBoardParams = { name: player.nickname, result: board };
    await post(`${config.proxy}/${gameName.toLocaleLowerCase()}/api/set-board`, setBoardParams);

    const settlement = await bet(player.id, { name: gameName, proxyRoute }, { amount, betChoice, freeSpin });

    reply.code(200).send({ settlement });
});

fastify.post("/bet-by-batch", async (request, reply) => {
    const { game } = request.query;
    const bets = request.body;
    const proxyRoute = `/${game.toLocaleLowerCase()}/socket.io`;

    const testCases = Object.keys(bets);
    const result = {};

    for await (const testId of testCases) {
        const { amount, betChoice, board, freeSpin } = bets[testId];

        const setBoardParams = { name: player.nickname, result: board.split(",").map((x) => parseInt(x)) };
        await post(`${config.proxy}/${game.toLocaleLowerCase()}/api/set-board`, setBoardParams);

        const convertChoices = betChoice.split(",").map((x) => parseInt(x));
        const settlement = await bet(player.id, { name: game, proxyRoute }, { amount, betChoice: convertChoices, freeSpin });

        result[testId] = { roundId: settlement.roundId };
    }

    reply.code(200).send({ result });
});

fastify.post("/create-player", async (request, reply) => {
    await initPlayer(player.id, player.nickname);
});

// Run the server!
const start = async () => {
    try {
        await init(config.authenticateSettings);
        await initPlayer(player.id, player.nickname);
        await fastify.listen({ port: 5000, host: "0.0.0.0" });

        console.log(`AutoBot started at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    } catch (err) {
        fastify.log.error(err);
        console.log(err);
        process.exit(1);
    }
};

start();
