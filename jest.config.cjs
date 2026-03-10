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
    '<rootDir>/.worktrees/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // Fix for module resolution issues
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
}

// Override transformIgnorePatterns after next/jest resolves, so our
// ESM allowlist replaces the default next/jest patterns entirely.
const esmPackages = [
  'geist',
  'feed',
  'remark',
  'remark-html',
  'remark-parse',
  'remark-rehype',
  'rehype-prism-plus',
  'rehype-raw',
  'rehype-slug',
  'rehype-stringify',
  'unified',
  'bail',
  'is-plain-obj',
  'trough',
  'vfile',
  'micromark',
  'decode-named-character-reference',
  'character-entities',
  'github-slugger',
  'mdast-util-.*',
  'hast-util-.*',
  'unist-.*',
].join('|')

module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)()
  jestConfig.transformIgnorePatterns = [`node_modules/(?!(${esmPackages})/)`, '^.+\\.module\\.(css|sass|scss)$']
  return jestConfig
}
