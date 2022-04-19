const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: [],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/api/(.*)$': ['<rootDir>/api/$1'],
    '^@/components/(.*)$': ['<rootDir>/components/$1'],
    '^@/lib/(.*)$': ['<rootDir>/lib/$1'],
    '^@/pages/(.*)$': ['<rootDir>/pages/$1'],
    '^@/store/(.*)$': ['<rootDir>/store/$1']
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
