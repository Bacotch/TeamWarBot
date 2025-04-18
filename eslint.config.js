import eslintRecommended from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';

export default [
    {
        files: ['**/*.{js,jsx,mjs,cjs}'],
        plugins: {
            n: nPlugin,
            promise: promisePlugin,
        },
        rules: {
            ...eslintRecommended.configs.recommended.rules,
            ...nPlugin.configs.recommended.rules,
            ...promisePlugin.configs.recommended.rules,
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: ['./tsconfig.json'],
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
            import: importPlugin,
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            'no-unused-vars': 'off', // TypeScript の型チェックと競合するためオフにする
            '@typescript-eslint/no-unused-vars': 'warn', // こちらで未使用変数をチェック
            '@typescript-eslint/explicit-function-return-type': 'warn', // 関数の戻り値の型を明示することを推奨
            '@typescript-eslint/explicit-member-accessibility': 'warn', // クラスメンバーのアクセス修飾子を明示することを推奨
            // 他の TypeScript 固有のルールを追加できます
        },
        settings: {
            'import/resolver': {
                typescript:{
                    alwaysTryTypes: true,
                    project: './tsconfig.json'
                },
                node: true,
            },
        },
    },
    {
        ignores: [
            'node_modules/',
            'dist/',
            'test.ts'
            // 他に除外したいファイルやディレクトリがあればここに記述
        ],
    },
];