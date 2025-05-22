const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^next-intl$': '<rootDir>/__mocks__/next-intl.js',
    },
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest'
    },
    transformIgnorePatterns: [
        '/node_modules/(?!next-intl|lucide-react).+\\.(js|jsx|ts|tsx)$',
    ],
    testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
