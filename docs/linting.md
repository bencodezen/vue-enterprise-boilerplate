# Linting & formatting

This project uses ESLint, Stylelint, Markdownlint, and Prettier to catch errors and avoid bikeshedding by enforcing a common code style.

## Scripts

There are a few different contexts in which the linters run.

### Terminal

```sh
# Lint all files, fixing many violations automatically
yarn lint
```

See `package.json` to update.

### Pre-commit

Staged files are automatically linted and tested before each commit.

See `lint-staged.config.js` to update.

### Editor

In supported editors, all files will be linted and formatted on-save. See [editors.md](editors.md) for details.

## Configuration

This boilerplate ships with opinionated defaults, but you can edit each tools configuration in the following config files:

* ESLint
  * `.eslintrc.js`
  * `.eslintignore`
* Stylelint
  * `stylelint.config.js`
* Markdownlint
  * `.markdownlintrc`
* Prettier
  * `.prettierrc.js`
  * `.prettierignore`
