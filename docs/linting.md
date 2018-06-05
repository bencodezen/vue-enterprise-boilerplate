# Linting & formatting

- [Languages](#languages)
- [Scripts](#scripts)
  - [Terminal](#terminal)
  - [Pre-commit](#pre-commit)
  - [Editor](#editor)
- [Configuration](#configuration)
- [FAQ](#faq)

This project uses ESLint, Stylelint, Markdownlint, and Prettier to catch errors and avoid bikeshedding by enforcing a common code style.

## Languages

- **JavaScript** is linted by ESLint and formatted by Prettier
- **HTML** (in templates and JSX) is linted by ESLint
- **CSS** is linted by Stylelint and formatted by Prettier
- **Markdown** is linted by Markdownlint and formatted by Prettier
- **JSON** is formatted by Prettier
- **Images** are minified by `imagemin-lint-staged` (only on pre-commit)

## Scripts

There are a few different contexts in which the linters run.

### Terminal

```bash
# Lint all files, fixing many violations automatically
yarn lint
```

See `package.json` to update.

### Pre-commit

Staged files are automatically linted and tested before each commit. See `lint-staged.config.js` to update.

### Editor

In supported editors, all files will be linted and formatted on-save. See [editors.md](editors.md) for details.

## Configuration

This boilerplate ships with opinionated defaults, but you can edit each tools configuration in the following config files:

- [ESLint](https://eslint.org/docs/user-guide/configuring)
  - `.eslintrc.js`
  - `.eslintignore`
- [Stylelint](https://stylelint.io/user-guide/configuration/)
  - `stylelint.config.js`
- [Markdownlint](https://github.com/markdownlint/markdownlint/blob/master/docs/configuration.md)
  - `.markdownlintrc`
- [Prettier](https://prettier.io/docs/en/configuration.html)
  - `.prettierrc.js`
  - `.prettierignore`

## FAQ

**So many configuration files! Why not move more of this to `package.json`?**

- Moving all possible configs to `package.json` can make it _really_ packed, so that quickly navigating to a specific config becomes difficult.
- When split out into their own file, many tools provide the option of exporting a config from JS. I do this wherever possible, because dynamic configurations are simply more powerful, able to respond to environment variables and much more.
