export default {
    system: "SC1",
    owUrl: "https://l1-ows1.lumigame.com/SabaClub",
    simulatorUrl: "https://l1-glbs1.lumigame.com",
    proxy: "https://l1-proxy1.lumigame.com",
    gameInfo: {
        gameNames: ["MagicForest"],
        proxyRoute: "/magicforest/socket.io",
    },
    authenticateSettings: {
        url: "https://l1-auth1.lumigame.com/",
        id: "autobot",
        secret: "autobot@20luminet&",
        requestTimeout: 10000,
        useAuthenticate: true,
        audiences: ["admin-api", "game-services"],
    },
    testConfig: {
        totalUsers: 800,
        userBetEvent: 10,
        betAmount: 10,
    },
};
