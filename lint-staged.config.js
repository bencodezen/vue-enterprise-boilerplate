module.exports = {
  '*.{js,jsx}': [
    'eslint --fix',
    'prettier --list-different --write',
    'git add',
    'jest --no-cache --findRelatedTests',
  ],
  '*.json': ['prettier --list-different --write', 'git add'],
  '*.vue': [
    'eslint --fix',
    'stylelint --fix',
    'prettier --list-different --write',
    'git add',
    'jest --no-cache --findRelatedTests',
  ],
  '*.scss': ['stylelint --fix', 'prettier --list-different --write', 'git add'],
  '*.md': ['markdownlint', 'prettier --list-different --write', 'git add'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
}
