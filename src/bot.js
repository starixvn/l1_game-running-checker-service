import { PlayerIds } from "./constants/constants";
import { initPlayer } from "./runners/player-initializer";
import { bet } from "./handlers/bet-handler";
import config from "./config";

const run = async () => {
    try {
        const player = await initPlayer(PlayerIds[0]);
        const { gameNames, proxyRoute } = config.gameInfo;

        const betChoice = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        const betTicket = { amount: 0.1, betChoice, freeSpin: false };

        const roundId = await bet(PlayerIds[0], { name: gameNames[0], proxyRoute }, betTicket);

        console.log(roundId);
    } catch (ex) {
        console.log(ex);
    }
};

run();
