# Editor Integration

- [Visual Studio Code](#visual-studio-code)
  - [Recommended Extensions](#recommended-extensions)
  - [Workspace Settings](#workspace-settings)
- [FAQ](#faq)

## Visual Studio Code

This project is optimized for VS Code. With the [recommended extensions](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions) and workspace settings in `.vscode/`, you get:

- Vue 3 syntax highlighting and intellisense (via Volar)
- Format-on-save with Prettier
- Lint-on-save with ESLint and Stylelint
- Playwright test integration
- Path autocompletion for imports

### Recommended Extensions

Install recommended extensions when prompted, or run `Extensions: Show Recommended Extensions` from the command palette.

| Extension | Purpose |
|-----------|---------|
| [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) | Vue 3 language support (syntax, intellisense, type checking) |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) | Code formatting |
| [Playwright Test](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) | E2E test runner integration |
| [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) | Autocomplete for file paths |
| [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) | Highlight TODOs, notes, and warnings in comments |
| [Peacock](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock) | Color-code workspaces (useful for multiple projects) |

> **Note:** If you previously used Vetur for Vue 2, uninstall it. Volar (Vue - Official) is the recommended extension for Vue 3.

### Workspace Settings

The `.vscode/settings.json` file configures:

**Formatting:**
- 2-space indentation
- Trim trailing whitespace
- Insert final newline
- Unix line endings (LF)

**Auto-fix on save:**
- Prettier formats code
- ESLint fixes JavaScript/Vue issues
- Stylelint fixes CSS issues

**File hiding:**
- Hides `dist/`, `coverage/`, and log files from explorer

These settings only apply to this workspace and won't affect your global VS Code configuration.

## FAQ

**What kinds of editor settings and extensions should be added to the project?**

All additions must:

- Be specific to this project's needs
- Not interfere with any team member's workflow

For example, an extension for syntax highlighting or linting is welcome, but personal preferences like color themes or font settings should stay in your user settings, not the workspace.

**Why Volar instead of Vetur?**

Volar (now called "Vue - Official") is the recommended extension for Vue 3. It provides better TypeScript support, improved performance, and is actively maintained by the Vue team. Vetur was designed for Vue 2 and is no longer recommended.
