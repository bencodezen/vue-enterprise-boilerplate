# Linting & Formatting

- [Overview](#overview)
- [Languages](#languages)
- [Scripts](#scripts)
  - [Terminal](#terminal)
  - [Editor](#editor)
- [Configuration](#configuration)
- [FAQ](#faq)

This project uses ESLint and Prettier to catch errors and enforce a consistent code style.

## Overview

| Tool | Purpose |
|------|---------|
| [ESLint](https://eslint.org/) | Catches bugs and enforces code quality rules |
| [Prettier](https://prettier.io/) | Formats code for consistent style |

ESLint handles logic and correctness, Prettier handles formatting. They're configured to work together without conflicts.

## Languages

- **TypeScript/JavaScript** — Linted by ESLint, formatted by Prettier
- **Vue SFCs** — Linted by ESLint (`eslint-plugin-vue`), formatted by Prettier
- **JSON/HTML/CSS/Markdown** — Formatted by Prettier

## Scripts

### Terminal

```bash
# Lint and auto-fix issues
pnpm lint

# Format all files in src/
pnpm format
```

### Editor

With the recommended VS Code extensions, files are automatically:
- Linted on save (ESLint)
- Formatted on save (Prettier)

See [editors.md](editors.md) for setup details.

## Configuration

| Tool | Config File | Docs |
|------|-------------|------|
| ESLint | `.eslintrc.cjs` | [ESLint Configuration](https://eslint.org/docs/user-guide/configuring) |
| Prettier | `.prettierrc.json` | [Prettier Configuration](https://prettier.io/docs/en/configuration.html) |

### ESLint Setup

The ESLint config extends:
- `plugin:vue/vue3-essential` — Vue 3 specific rules
- `eslint:recommended` — Core ESLint rules
- `@vue/eslint-config-typescript` — TypeScript support
- `@vue/eslint-config-prettier/skip-formatting` — Disables formatting rules (Prettier handles those)

### Prettier Setup

```json
{
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}
```

## FAQ

**Why separate ESLint and Prettier?**

ESLint is best at catching bugs and enforcing code quality (unused variables, missing returns, etc.). Prettier is best at formatting (indentation, line breaks, quotes). Using both gives you the best of each tool.

**Why no semicolons?**

This is a stylistic choice. JavaScript's ASI (Automatic Semicolon Insertion) handles most cases, and omitting semicolons reduces visual noise. If you prefer semicolons, change `"semi": true` in `.prettierrc.json`.

**How do I add Stylelint for CSS?**

If you need more advanced CSS linting:

```bash
pnpm add -D stylelint stylelint-config-standard-scss
```

Create `stylelint.config.js`:
```js
export default {
  extends: ['stylelint-config-standard-scss']
}
```

Add to `.vscode/settings.json`:
```json
{
  "stylelint.enable": true,
  "css.validate": false,
  "scss.validate": false
}
```

**So many configuration files! Why not move more to `package.json`?**

While some configs can live in `package.json`, separate files offer benefits:
- Easier to find and edit specific tool configs
- Supports dynamic configuration via JavaScript
- Better IDE support and syntax highlighting
- Cleaner `package.json` that focuses on dependencies and scripts
