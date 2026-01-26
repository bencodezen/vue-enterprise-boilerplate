# Architecture

- [Architecture](#architecture)
  - [`.vscode`](#vscode)
  - [`docs`](#docs)
  - [`e2e`](#e2e)
  - [`public`](#public)
  - [`src`](#src)
    - [`assets`](#assets)
    - [`components`](#components)
    - [`composables`](#composables)
    - [`design`](#design)
    - [`layouts`](#layouts)
    - [`pages`](#pages)
    - [`router`](#router)
    - [`stores`](#stores)
    - [`App.vue`](#appvue)
    - [`main.ts`](#maints)
    - [`types.ts`](#typests)
  - [Configuration Files](#configuration-files)

## `.vscode`

Settings and extensions specific to this project, for Visual Studio Code. See [the editors doc](editors.md) for more.

## `docs`

You found me! Documentation is powered by [VitePress](https://vitepress.dev/) and can be built as a static site.

```bash
# Start docs dev server
npm run docs:dev

# Build docs for production
npm run docs:build
```

### `.vitepress`

VitePress configuration including sidebar navigation, theme settings, and build options.

## `e2e`

End-to-end tests using [Playwright](https://playwright.dev/). See [the tests doc](tests.md) for more.

## `public`

Static assets that will be served directly without processing. Files here are copied to the build output as-is.

## `src`

Where we keep all our source files.

### `assets`

Static assets like images and fonts that will be processed by Vite. Assets here can be imported in components and will be optimized during build.

### `components`

Reusable Vue components, including [global base components](development.md#base-components). Components are auto-registered via `unplugin-vue-components`.

Unit tests are colocated with components using the `.spec.ts` extension (e.g., `BaseButton.spec.ts`).

### `composables`

Reusable composition functions that encapsulate stateful logic. These follow the `use*` naming convention (e.g., `useTheme.ts`).

Composables are the Vue 3 replacement for mixins, providing better TypeScript support and explicit dependencies.

### `design`

SCSS design system variables and utilities:

- `_colors.scss` - Color palette
- `_typography.scss` - Font scales and text styles
- `_sizes.scss` - Spacing and sizing
- `_fonts.scss` - Font imports
- `_durations.scss` - Animation timing
- `_layers.scss` - Z-index management
- `index.scss` - Central import point

See [the tech doc](tech.md#design-variables) for more.

### `layouts`

Layout components that wrap pages with common structure (navigation, footer, etc.). Layouts receive page content via slots.

### `pages`

Page components that map to routes. Each file in this directory represents a distinct route in the application.

### `router`

Vue Router configuration:

- `index.ts` - Router instance creation and global guards
- `routes.ts` - Route definitions with lazy-loaded pages

See [the routing doc](routing.md) for more.

### `stores`

[Pinia](https://pinia.vuejs.org/) stores for global state management. Each store is a separate file following the composition API pattern.

See [the state doc](state.md) for more.

### `App.vue`

The root Vue component that renders the router view. This is typically the only component to contain global CSS.

### `main.ts`

The entry point to our app, where we create the Vue application instance, register plugins (Pinia, Router, Unhead), and mount to the DOM.

### `types.ts`

Shared TypeScript type definitions and utility types used across the application.

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite build configuration, plugins, and dev server |
| `tsconfig.json` | Root TypeScript configuration |
| `tsconfig.app.json` | TypeScript config for application code |
| `tsconfig.node.json` | TypeScript config for Node.js files |
| `tsconfig.vitest.json` | TypeScript config for Vitest tests |
| `vitest.config.ts` | Unit test configuration |
| `playwright.config.ts` | E2E test configuration |
| `.eslintrc.cjs` | ESLint linting rules |
| `.prettierrc.json` | Prettier formatting rules |
| `env.d.ts` | Environment variable type declarations |
| `components.d.ts` | Auto-generated component type declarations |
| `auto-imports.d.ts` | Auto-generated import type declarations |
