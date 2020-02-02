module.exports = {
  '*.js': ['yarn lint:eslint', 'yarn lint:prettier', 'yarn test:unit:file'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': [
    'yarn lint:prettier --parser json',
  ],
  'package.json': ['yarn lint:prettier'],
  '*.vue': [
    'yarn lint:eslint',
    'yarn lint:stylelint',
    'yarn lint:prettier',
    'yarn test:unit:file',
  ],
  '*.scss': ['yarn lint:stylelint', 'yarn lint:prettier'],
  '*.md': ['yarn lint:markdownlint', 'yarn lint:prettier'],
  '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged'],
}
