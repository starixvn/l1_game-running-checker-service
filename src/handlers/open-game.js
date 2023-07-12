import getSSOToken from "./sso-handler";
import { authorize, setCurrencyGroup } from "./authorize-handler.js";
import { joinGame } from "./socket-handler";
import { GAMES } from "../constants/constants";

export const openGame = async (player, gameInfo) => {
    try {
        const { username, password } = player;
        const ssoToken = await getSSOToken(username, password);
        if (!ssoToken) {
            return "SSO FAILED !!!";
        }
        await setCurrencyGroup(ssoToken);
        const authorizeInfo = await authorize(ssoToken);
        const { inGameResult } = await joinGame(gameInfo, authorizeInfo);

        return { status: "OK", inGameResult };
    } catch (e) {
        console.log(e);
        return { status: "FAILED", detail: e.message };
    }
};

export const openGames = async (player, games) => {
    try {
        const { username, password } = player;
        const ssoToken = await getSSOToken(username, password);

        if (!ssoToken) {
            return "SSO FAILED !!!";
        }

        await setCurrencyGroup(ssoToken);
        const authorizeInfo = await authorize(ssoToken);
        const gameInfos = GAMES.filter((game) => games.includes(game.id));

        const result = [];
        for (const game of gameInfos) {
            const gameInfo = {
                name: game.key,
                key: game.key.toLocaleLowerCase(),
                proxyRoute: `/${game.route ?? game.name.toLocaleLowerCase()}/socket.io`,
            };
            try {
                const data = await joinGame(gameInfo, authorizeInfo);
                result.push(data);
            } catch (err) {
                result.push({ [game.name]: err.message });
            }
        }

        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
};

export const openAllGames = async (player) => {
    try {
        const { username, password } = player;
        const ssoToken = await getSSOToken(username, password);
        if (!ssoToken) {
            return "SSO FAILED !!!";
        }
        await setCurrencyGroup(ssoToken);
        const authorizeInfo = await authorize(ssoToken);

        const jobs = GAMES.map((game) => {
            const gameInfo = {
                name: game.key,
                proxyRoute: `/${game.route ?? game.name.toLocaleLowerCase()}/socket.io`,
            };
            return joinGame(gameInfo, authorizeInfo);
        });

        const result = await Promise.all(jobs);

        return result;
    } catch (e) {
        console.log(e);
        return e;
    }
};
