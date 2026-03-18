import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, __PROJECT_ROOT__: 'readonly' },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // Node.js context: config files and build scripts
  {
    files: ['*.config.js', 'prerender.js', 'server.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  // Server-side entry: not a browser module, react-refresh rules don't apply
  {
    files: ['src/entry-server.jsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
]);
