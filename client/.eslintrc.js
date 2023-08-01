// eslint-disable-next-line no-undef
module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'standard'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        indent: 'off',
        '@typescript-eslint/indent': ['error']
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
