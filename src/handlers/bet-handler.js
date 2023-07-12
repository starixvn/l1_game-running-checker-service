import { placeBet } from "./socket-handler";
import { openGame } from "./open-game";

export const bet = async (player, gameInfo, bet) => {
    try {
        const { socket } = await openGame(player, gameInfo);

        if (socket) {
            return await autoPlaceBet(socket, gameInfo, bet);
        }

        return 0;
    } catch (e) {
        console.log(e);
        return 0;
    }
};

const autoPlaceBet = async (socket, gameInfo, { amount, betChoice, freeSpin }) => {
    return placeBet(socket, { amount, betChoice, freeSpin }, gameInfo);
};
