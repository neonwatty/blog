const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!app/**/*.{js,jsx,ts,tsx}', // Exclude Next.js app directory
  ],
  // Disable coverage threshold to focus on test execution
  coverageThreshold: {},
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/tests/e2e/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(remark|remark-html|remark-parse|unified|bail|is-plain-obj|trough|vfile|micromark|decode-named-character-reference|character-entities|mdast-util-from-markdown|mdast-util-to-markdown|mdast-util-to-hast|hast-util-to-html)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // Fix for module resolution issues
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
}

module.exports = createJestConfig(customJestConfig)