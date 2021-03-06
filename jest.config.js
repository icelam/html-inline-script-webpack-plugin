module.exports = {
  collectCoverageFrom: ['src/**/*.[tj]s'],
  testMatch: ['<rootDir>__tests__/**/*.test.[jt]s'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json'
    }
  },
  testEnvironment: 'node'
};
