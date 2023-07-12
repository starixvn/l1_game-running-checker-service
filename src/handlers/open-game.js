import getSSOToken from "./sso-handler";
import { authorize, setCurrencyGroup } from "./authorize-handler.js";
import { joinGame } from "./socket-handler";

export const openGame = async (player, gameInfo) => {
    try {
        const { username, password } = player;
        const ssoToken = await getSSOToken(username, password);
        await setCurrencyGroup(ssoToken);
        const authorizeInfo = await authorize(ssoToken);
        const socket = await joinGame(gameInfo, authorizeInfo);

        return !!socket;
    } catch (e) {
        console.log(e);
        return false;
    }
};
