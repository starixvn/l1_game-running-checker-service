import getSSOToken from "./sso-handler";
import { authorize } from "./authorize-handler.js";
import { joinGame, placeBet } from "./socket-handler";

export const bet = async (player, gameInfo, bet) => {
    try {
      
        const { id, currency } = player;
        const ssoToken = await getSSOToken(id, currency);
        const authorizeInfo = await authorize(ssoToken);
        const socket = await joinGame(gameInfo, authorizeInfo);
    
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
