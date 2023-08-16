import { io } from "socket.io-client";
import { userAgent } from "../constants/constants";
import config from "../app-configs";
import * as MsgpackParser from "socket.io-msgpack-parser";

const promiseTimeOut = 5000;

export const joinGame = async (gameInfo, authorizeInfo) => {
    console.log(gameInfo.name);
    try {
        const socket = await connectSocket(gameInfo);

        if (!socket || !socket.emit) {
            return { [gameInfo.name]: "Connect Socket failed" };
        }

        const signInSuccessful = await requestSignIn(socket, authorizeInfo);
        const inGameResult = await requestInGame(socket, gameInfo);

        socket.close();

        if (signInSuccessful && inGameResult) {
            return { [gameInfo.name]: { ...inGameResult } };
        } else {
            return { [gameInfo.name]: "Ingame failed" };
        }
    } catch (err) {
        return { [gameInfo.name]: err.message };
    }
};

export const placeBet = async (socket, betInfo, gameInfo) =>
    new Promise((resolve, reject) => {
        let isWaitForSettlement = false;

        socket.on(gameInfo.name, (data) => {
            if (data.endBet > 0) {
                isWaitForSettlement = true;
            }

            if (data.bonuses) {
                const { bonus } = data.bonuses;
                for (let index = 1; index <= bonus; index++) {
                    socket.emit("bonus", { chest: index });
                }
            }

            if (data.finish && isWaitForSettlement) {
                resolve(data.finish);
            }

            if (data.endBet === -1) {
                console.log(data);
                resolve(-1);
            }
        });

        socket.emit("bet", betInfo);
    });

const connectSocket = async (gameInfo) =>
    new Promise((resolve, reject) => {
        const socketOptions = {
            forceNew: true,
            transports: ["websocket"],
            upgrade: false,
            path: gameInfo.proxyRoute,
            parser: config.enabledMsgPack ? MsgpackParser : undefined,
            extraHeaders: {
                "user-agent": userAgent,
            },
        };

        const uri = `${config.proxy}/user/${gameInfo.name.toLowerCase()}`;

        const socket = io(uri, socketOptions);

        socket.on("connect", () => {
            resolve(socket);
        });

        socket.on("connect_error", (error) => {
            resolve(error);
        });

        setTimeout(() => {
            reject("socket - time out");
        }, promiseTimeOut);
    });

const requestSignIn = async (socket, authorizeInfo) =>
    new Promise((resolve, reject) => {
        socket.emit("signin", authorizeInfo);

        socket.on("signedIn", () => {
            resolve(true);
        });

        socket.on("message", (data) => {
            if (data.unauthorized || data.notPermittedToPlay) {
                resolve(false);
            }
        });

        setTimeout(() => {
            reject("signIn - time out");
        }, promiseTimeOut);
    });

const requestInGame = async (socket, gameInfo) =>
    new Promise((resolve, reject) => {
        socket.emit("inGame");

        socket.on(gameInfo.name, (data) => {
            if (data.gameConfigs) {
                const { remainingTime, roundId } = data;
                resolve({ remainingTime, roundId });
            }

            setTimeout(() => {
                resolve({ msg: "ingame-timeout" });
            }, promiseTimeOut);
        });
    });
