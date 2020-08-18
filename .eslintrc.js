module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-use-before-define': 'error',
    'no-unused-vars': ['warn', { args: 'after-used' }],
    curly: 'error',
    'no-trailing-spaces': 'error',
    'react-hooks/exhaustive-deps': 'off',
  },
};
