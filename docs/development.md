# Setup and Development

- [Setup and Development](#setup-and-development)
  - [First-time setup](#first-time-setup)
  - [Installation](#installation)
  - [Dev server](#dev-server)
    - [Developing with a production API](#developing-with-a-production-api)
  - [Aliases](#aliases)
  - [Auto-imports](#auto-imports)
    - [Base components](#base-components)
    - [Vue APIs](#vue-apis)

## First-time setup

Make sure you have the following installed:

- [Node](https://nodejs.org/en/) (at least the latest LTS)
- [pnpm](https://pnpm.io/) (recommended package manager)

### Why pnpm?

This project recommends pnpm over npm for several reasons:

- **Faster installs** - Uses symlinks and a content-addressable store for efficient caching
- **Disk space efficient** - Packages are stored once globally and linked, not duplicated per project
- **Strict dependencies** - Prevents "phantom dependencies" where code accidentally imports packages not listed in package.json
- **Vue ecosystem standard** - Vue, Vite, and Nuxt all use pnpm for development

To install pnpm:

```bash
# Using npm
npm install -g pnpm

# Or using Corepack (included with Node 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

## Installation

```bash
# Install dependencies from package.json
pnpm install
```

> **Note:** npm and yarn will also work if you prefer, but pnpm is recommended for the reasons above.

## Dev server

```bash
# Launch the dev server
pnpm dev

# Launch the dev server and automatically open it in
# your default browser when ready
pnpm dev --open
```

Vite's dev server starts almost instantly and features lightning-fast Hot Module Replacement (HMR).

### Developing with a production API

By default, you may want to use a mock API during development. To develop against a local or production API instead, create a `.env.local` file:

```bash
# .env.local
VITE_API_BASE_URL=http://localhost:3000
```

Or set the environment variable inline:

```bash
# Develop against a local backend server
VITE_API_BASE_URL=http://localhost:3000 pnpm dev

# Develop against a production server
VITE_API_BASE_URL=https://api.example.com pnpm dev
```

Access this in your code via `import.meta.env.VITE_API_BASE_URL`.

## Aliases

Path aliases simplify imports and make refactoring easier. They're configured in both `vite.config.ts` and `tsconfig.app.json` for consistent behavior across dev, build, and IDE intellisense.

| Alias | Path |
|-------|------|
| `@` | `src/` |

Example usage:

```typescript
// Instead of relative paths
import { useTheme } from '../../../composables/useTheme'

// Use aliases
import { useTheme } from '@/composables/useTheme'
```

To add new aliases, update both:
- `vite.config.ts` - for Vite resolution
- `tsconfig.app.json` - for TypeScript and IDE support

## Auto-imports

This project uses [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) and [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) to automatically register components and imports.

### Base components

Components in `src/components/` are automatically registered globally. You don't need to import them to use them in templates:

```vue
<template>
  <!-- BaseButton is auto-imported from src/components/BaseButton.vue -->
  <BaseButton>Click me</BaseButton>
</template>

<script setup lang="ts">
// No import needed!
</script>
```

[Base components](https://vuejs.org/style-guide/rules-strongly-recommended.html#base-component-names) (a.k.a. presentational, dumb, or pure components) that apply app-specific styling should begin with the `Base` prefix (e.g., `BaseButton`, `BaseInput`).

### Vue APIs

Common Vue APIs are auto-imported, so you don't need to manually import them:

```vue
<script setup lang="ts">
// These are auto-imported - no import statement needed
const count = ref(0)
const doubled = computed(() => count.value * 2)

watch(count, (newVal) => {
  console.log('Count changed:', newVal)
})

onMounted(() => {
  console.log('Component mounted')
})
</script>
```

Auto-imported APIs include:
- Vue: `ref`, `computed`, `watch`, `onMounted`, etc.
- Vue Router: `useRouter`, `useRoute`
- Pinia: `defineStore`, `storeToRefs`
- VueUse: Various composables

The generated type declarations are in `auto-imports.d.ts` and `components.d.ts`.
