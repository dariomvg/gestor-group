const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', 
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], 
  moduleNameMapper: {
    
    '\\.(css|scss)$': 'identity-obj-proxy',
    
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

module.exports = createJestConfig(customJestConfig);
