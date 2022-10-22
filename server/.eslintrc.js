module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-base/legacy',
    'prettier'
  ],
  env: {
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  globals: {
    'Atomics': 'readonly',
    'db': 'readonly',
  },
  rules: {
    'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': false }],
    'no-console': 1,
    'no-unused-vars': 1,
    'camelcase': 0,
    'no-underscore-dangle': 0,
  },
};
