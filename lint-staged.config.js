module.exports = {
  '*.js': [
    'eslint --fix',
    'prettier --write --loglevel warn',
    'git add',
    'yarn unit --bail --findRelatedTests',
  ],
  '{*.json,*.code-snippets,.*rc}': [
    'prettier --write --loglevel warn --parser json',
    'git add',
  ],
  '*.vue': [
    'eslint --fix',
    'stylelint --fix',
    'prettier --write --loglevel warn',
    'git add',
    'yarn unit --bail --findRelatedTests',
  ],
  '*.scss': ['stylelint --fix', 'prettier --write --loglevel warn', 'git add'],
  '*.md': ['markdownlint', 'prettier --write', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
}
