export default {
  preset: 'ts-jest', globals: { 'ts-jest': { tsconfig: 'tsconfig.test.json' } },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/functions/', '<rootDir>/sleep-tracker/'],
  testTimeout: 30000
};
