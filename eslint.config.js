import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      '.next/',
      'out/',
      'node_modules/',
      'coverage/',
      'public/',
      '*.config.js',
      '*.config.mjs',
      'scripts/',
      'test-*.js',
      '*.test.ts',
      '*.test.tsx',
      '__tests__/',
      'playwright-report/',
      'test-results/',
      'build/',
      'dist/',
    ],
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': ['error', { ignore: ['jsx'] }],
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
