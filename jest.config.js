/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    rootDir: '.',
    roots: ['<rootDir>'],
    testRegex: '[.-]spec.tsx?$',
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
    },
    coverageDirectory: './coverage',
    coverageReporters: ['clover'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/',
        '/__mocks__/',
        '/test/',
        '/testing/',
    ],
};
