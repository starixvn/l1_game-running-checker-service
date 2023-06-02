import Fastify from "fastify";
import { PlayerIds } from "./constants/constants";
import { initPlayer } from "./runners/player-initializer";
import { bet } from "./handlers/bet-handler";
import config from "./config";

const fastify = Fastify({
    logger: true,
});

// Declare a route
fastify.get("/", async (request, reply) => {
    return { hello: "world" };
});

fastify.post("/bet", async (request, reply) => {
    const { gameNames, proxyRoute } = config.gameInfo;
    const { amount, betChoice, freeSpin } = request.body;

    const roundId = await bet(PlayerIds[0], { name: gameNames[0], proxyRoute }, { amount, betChoice, freeSpin });

    reply.code(200).send({ roundId });
});

// Run the server!
const start = async () => {
    try {
        await initPlayer(PlayerIds[0]);
        await fastify.listen({ port: 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
