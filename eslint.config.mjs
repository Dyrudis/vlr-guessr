import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores(['node_modules', 'dist', 'build', 'public']),
  {
    extends: compat.extends(),

    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
      'no-relative-import-paths': noRelativeImportPaths,
    },

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.app.json',
      },
    },

    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-relative-import-paths/no-relative-import-paths': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],

    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React and other external libraries
            ['^react$', '^@?\\w'],
            // Aliased imports from external libraries
            ['^@'],
            // Aliased imports from project
            ['^@components', '^@types', '^@queries', '^@data', '^@assets'],
            // Parent imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Sibling imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports
            ['^.+\\.s?css$'],
            // Side effect imports
            ['^\\u0000'],
          ],
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': ['warn', { allowSameFolder: true }],
    },
  },
])
