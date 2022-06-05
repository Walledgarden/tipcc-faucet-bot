module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'import',
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb-typescript/base',
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    ignorePatterns: [
        'src/Templates/**/*.ts',
        'dist/**/*.js',
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-constant-condition': 'off',
    },
};