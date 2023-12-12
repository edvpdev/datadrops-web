// const nextJest = require('next/jest');
import { resolve } from 'path';
import type { Config } from 'jest';

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

const config: Config = {
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@auth/prisma-adapter': resolve(
      __dirname,
      './node_modules/@auth/prisma-adapter'
    ),
    '^@/mocks/*': resolve(__dirname, './__mocks__/$1'),
    '^@/actions/(.*)$': resolve(__dirname, './app/actions/$1'),
    '^@/components/(.*)$': resolve(__dirname, './features/$1'),
    '^@/features/(.*)$': resolve(__dirname, './features/$1'),
    '^@/pages/(.*)$': resolve(__dirname, './pages/$1'),
    '^@/app/(.*)$': resolve(__dirname, './app/$1'),
    '^@/styles/(.*)$': resolve(__dirname, './styles/$1'),
    '^@/ui/(.*)$': resolve(__dirname, './app/ui/$1'),
    '^@/lib/(.*)$': resolve(__dirname, './lib/$1'),
    '^redux/(.*)$': resolve(__dirname, './redux/$1')
  },
  testEnvironment: 'jsdom'
  // preset: 'ts-jest'
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.test.json',
  //     diagnostics: {
  //       ignoreCodes: [6133]
  //     }
  //   }
  // }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config);
