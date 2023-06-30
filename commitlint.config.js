// https://commitlint.js.org/#/reference-rules
module.exports = {
  // https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', 1000],
  },
};
