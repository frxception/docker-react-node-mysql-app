import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      './tsconfig.json',
      '**/build',
      '**/dist',
      '**/node_modules',
      '**/*.test.js',
      '**/vite.config.ts',
      '**/postcss.config.js',
      '**/tailwind.config.js',
      '**/i18n.ts',
      'public/firebase-messaging-sw.js',
      'src/components/ui/*',
      'eslint.config.js',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:testing-library/react',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: ['./tsconfig.json', './.eslintrc.cjs'],
        tsconfigRootDir: '/Users/frx/Development/fullstack/docker-react-node-mysql-app/frontend',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react-hooks/rules-of-hooks': 2,
      'react-hooks/exhaustive-deps': 2,
      'react/no-array-index-key': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 0,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      // 'no-restricted-imports': 'off',
      'jsx-a11y/no-autofocus': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'no-restricted-imports': 'off',
      'no-console': 'off',
      'no-constant-binary-expression': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'prettier/prettier': [
        'off',
        {
          singleQuote: true,
        },
      ],

      // 'no-restricted-imports': [
      //   2,
      //   {
      //     patterns: ['@/features/*/*', '@/components/*', '@/hooks/*', '@/utils/*', '@/ts/*/*'],
      //   },
      // ],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],

          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],

          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'no-implied-eval': 'off',
      'require-await': 'off',
    },
  },
  {
    files: ['**/.eslintrc.{js,cjs}'],

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 5,
      sourceType: 'commonjs',
    },
  },
];
