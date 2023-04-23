export default {
    moduleFileExtensions: ['js', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
    testMatch: [
        '<rootDir>/tests/**/*.test.(js|jsx|ts|tsx)',
        '<rootDir>/src/**/*.test.(js|jsx|ts|tsx)',
    ]
}
