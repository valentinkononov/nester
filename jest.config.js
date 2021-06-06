const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: '.',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  testRegex: '[.-]spec.tsx?$',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(three)/)'],
  globalSetup: './apps/react/test/setup/globalSetup.js',
  setupFiles: ['./apps/react/test/setup/setup.js'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '\\.css$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/apps/react/test/__mocks__/fileMock.js',
  },
  coverageDirectory: './coverage',
  coverageReporters: ['clover'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/__mocks__/',
    '/test/',
    '/testing/',
    '<rootDir>/libs/models/src/entities/',
    '<rootDir>/libs/models/src/enums/',
    '<rootDir>/libs/models/src/vision/',
    '<rootDir>/libs/testUtils/',
    '<rootDir>/libs/typeorm/',
    '<rootDir>/libs/types/',
  ],
};
