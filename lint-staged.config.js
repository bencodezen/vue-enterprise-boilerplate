module.exports = {
  '*.{js,jsx}': [
    'eslint --fix',
    'prettier --write',
    'git add',
    'jest --bail --findRelatedTests',
  ],
  '*.json': ['prettier --write', 'git add'],
  '*.vue': [
    'eslint --fix',
    'stylelint --fix',
    'prettier --write',
    'git add',
    'jest --no-cache --bail --findRelatedTests',
  ],
  '*.scss': ['stylelint --fix', 'prettier --write', 'git add'],
  '*.md': ['markdownlint', 'prettier --write', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
}
