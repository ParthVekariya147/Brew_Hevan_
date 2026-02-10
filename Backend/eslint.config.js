import js from '@eslint/js';
import globals from 'globals';

export default [
    {
        ignores: ['node_modules/**', '.env', '*.log', 'eslint.config.js'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'no-undef': 'error',
        },
    },
];
