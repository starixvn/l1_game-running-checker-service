import { PlayerIds } from "../constants/constants";
import { signName, authorize } from "../handlers/authorize-handler";
import { setDefaultBalance, getSSOToken } from "../handlers/sso-handler";

export const setupStressUsers = async () => {
    for await (const playerId of PlayerIds) {
        await initPlayer(playerId);
        console.log(`${playerId} - done`);
    }

    console.log("SETUP TEST USERS DONE !");
};

export const initPlayer = async (playerId, nickname, currency) => {
    const ssoToken = await getSSOToken(playerId, currency);
    const authorizeInfo = await authorize(ssoToken);

    await setDefaultBalance(playerId);

    return signName(authorizeInfo, nickname);
};
