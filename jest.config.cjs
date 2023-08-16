module.exports = async () => {
    return {
        rootDir: "./",
        verbose: true,
        transform: {
            "^.+\\.js?$": "babel-jest",
        },
        testEnvironment: "node",
        transformIgnorePatterns: ["node_modules/(?!(sc-common|jest-auto-fixture)/)"],
        coverageReporters: ["clover", "lcov", "text-summary", "cobertura", "text"],
        reporters: ["default", ["jest-junit", { outputDirectory: "coverage" }]],
        testResultsProcessor: "jest-sonar-reporter",
        collectCoverageFrom: ["src/**/*.js"],
    };
};
