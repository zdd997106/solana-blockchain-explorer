import { dirname } from 'path';
import { fileURLToPath } from 'url';
import tsEslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);

const compat = new FlatCompat({
  baseDirectory: dirname(__filename),
});

export default tsEslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  extends: [
    ...compat.extends(
      'next/typescript',
      'next/core-web-vitals',
      'plugin:react/recommended',
      'eslint-config-airbnb-base',
      'plugin:@typescript-eslint/recommended',
    ),
    eslintPluginPrettierRecommended,
  ],
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': process.env.NODE_ENV === 'production' ? 'off' : 'warn',
    'no-use-before-define': 'off',
    'no-restricted-exports': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    "no-param-reassign": "off",
    'import/no-named-as-default': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
    ],
  },
});
