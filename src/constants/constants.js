const userAgent = "axios/0.27.2";
const GAMES = [
    {
        id: 1,
        name: "BigSmall",
        key: "BigSmall",
    },
    {
        id: 2,
        name: "SeDie",
        key: "SeDie",
    },
    {
        id: 3,
        name: "FishPrawnCrab",
        key: "FishPrawnCrab",
    },
    {
        id: 4,
        name: "TurboBigSmall",
        key: "TXTurbo",
        route: "turbobigsmall",
    },
    {
        id: 6,
        name: "TurboOddEven",
        key: "OETurbo",
        route: "turbooddeven",
    },
    {
        id: 7,
        name: "DragonTiger",
        key: "DragonTiger",
    },
    {
        id: 8,
        name: "KenoProMax",
        key: "KenoProMax",
    },
    {
        id: 9,
        name: "MiniSeDie",
        key: "MiniSeDie",
        route: "minisedie",
    },
    {
        id: 56,
        name: "MiniSeDie2",
        key: "MiniSeDie2",
        route: "minisedie",
        mini: {
            miniPanel: true,
        },
    },
    {
        id: 57,
        name: "MiniSeDie3",
        key: "MiniSeDie3",
        route: "minisedie",
    },
    {
        id: 58,
        name: "MiniSeDie4",
        key: "MiniSeDie4",
        route: "minisedie",
    },
    {
        id: 10,
        name: "Baccarat",
        key: "Baccarat",
    },
    {
        id: 11,
        name: "KenoMax",
        key: "KenoMax",
        route: "minikeno",
    },
    {
        id: 13,
        name: "KenoMax2",
        key: "KenoMax2",
        route: "minikeno",
    },
    {
        id: 14,
        name: "KenoMini",
        key: "KenoMini",
        route: "minikeno",
    },
    {
        id: 15,
        name: "KenoMini2",
        key: "KenoMini2",
        route: "minikeno",
    },
    {
        id: 16,
        name: "KenoEast",
        key: "KenoEast",
        route: "minikeno",
    },
    {
        id: 17,
        name: "KenoWest",
        key: "KenoWest",
        route: "minikeno",
    },
    {
        id: 18,
        name: "KenoSouth",
        key: "KenoSouth",
        route: "minikeno",
    },
    {
        id: 19,
        name: "KenoNorth",
        key: "KenoNorth",
        route: "minikeno",
    },
    {
        id: 21,
        name: "Roulette",
        key: "Roulette",
    },
    {
        id: 22,
        name: "VipSedie",
        key: "VipSeDie",
        route: "vsedie",
    },
    {
        id: 23,
        name: "BlackJack",
        key: "BlackJack",
    },
    {
        id: 24,
        name: "SpecialSeDie",
        key: "SpecialSeDie",
    },
    {
        id: 25,
        name: "SicBo",
        key: "SicBo",
    },
    {
        id: 26,
        name: "VipFishPrawnCrab",
        key: "VipFishPrawnCrab",
    },
    {
        id: 27,
        name: "VipBaccarat",
        key: "VipBaccarat",
    },
    {
        id: 28,
        name: "VipSedieWar",
        key: "VipSedieWar",
    },
    {
        id: 29,
        name: "FourGuardians",
        key: "FourGuardians",
    },
    {
        id: 31,
        name: "Lottery",
        key: "Lottery",
    },
    {
        id: 35,
        name: "ThreeCards",
        key: "ThreeCards",
    },
    {
        id: 38,
        name: "HeroesSlot",
        key: "HeroesSlot",
    },
    {
        id: 39,
        name: "CasinoHoldemPoker",
        key: "CasinoHoldemPoker",
    },
    {
        id: 42,
        name: "TexasHoldemPoker",
        key: "TexasHoldemPoker",
    },
    {
        id: 43,
        name: "BitcoinMaster",
        key: "BitcoinMaster",
    },
    {
        id: 45,
        name: "HiLo",
        key: "Hilo",
    },
    {
        id: 46,
        name: "NightClub",
        key: "NightClub",
    },
    {
        id: 47,
        name: "TreasureIsland",
        key: "TreasureIsland",
    },
    {
        id: 50,
        name: "UnbalancedBigSmall1",
        key: "UnbalancedBigSmall1",
        route: "unbalancedbigsmall",
    },
    {
        id: 51,
        name: "UnbalancedBigSmall2",
        key: "UnbalancedBigSmall2",
        route: "unbalancedbigsmall",
    },
    {
        id: 54,
        name: "UnbalancedBigSmall3",
        key: "UnbalancedBigSmall3",
        remoteBundle: {
            dependsOn: [],
        },
        route: "unbalancedbigsmall",
        mini: {
            miniPanel: true,
        },
    },
    {
        id: 55,
        name: "UnbalancedBigSmall4",
        key: "UnbalancedBigSmall4",
        remoteBundle: {
            dependsOn: [],
        },
        route: "unbalancedbigsmall",
        mini: {
            miniPanel: true,
        },
    },
    {
        id: 48,
        name: "BlockchainBaccarat",
        key: "BlockchainBaccarat",
        remoteBundle: {
            dependsOn: [],
        },
    },
    {
        id: 52,
        name: "MegaKeno",
        key: "MegaKeno",
        remoteBundle: {
            dependsOn: [],
        },
        route: "minikeno",
    },
    {
        id: 53,
        name: "MegaKeno2",
        key: "MegaKeno2",
        remoteBundle: {
            dependsOn: [],
        },
        route: "minikeno",
    },
    {
        id: 49,
        name: "WayToGoal",
        key: "WayToGoal",
        remoteBundle: "dependsOn:[]",
    },
    {
        id: 59,
        name: "FruitSlot",
        key: "FruitSlot",
        remoteBundle: {
            dependsOn: [],
        },
    },
    {
        id: 60,
        name: "FanTan",
        key: "FanTan",
        remoteBundle: {
            dependsOn: [],
        },
    },
    {
        id: 62,
        name: "FortuneCat",
        key: "FortuneCat",
        remoteBundle: {
            dependsOn: [],
        },
    },
    {
        id: 61,
        name: "WinThreeCards",
        key: "WinThreeCards",
        remoteBundle: {
            dependsOn: [],
        },
    },
    {
        id: 63,
        name: "HappyFish",
        key: "HappyFish",
        remoteBundle: {
            dependsOn: [],
        },
    },
    {
        id: 64,
        name: "MagicForest",
        key: "MagicForest",
        remoteBundle: {
            dependsOn: [],
        },
    },
    {
        id: 65,
        name: "DJClub",
        key: "DJClub",
        remoteBundle: {
            dependsOn: [],
        },
    },
];

export { userAgent, GAMES };
