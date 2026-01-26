# Languages and Technologies

- [TypeScript](#typescript)
  - [Why TypeScript](#why-typescript)
  - [Configuration](#configuration)
  - [TypeScript FAQ](#typescript-faq)
- [Vue](#vue)
  - [Composition API](#composition-api)
  - [Vue Router](#vue-router)
  - [Pinia](#pinia)
- [HTML](#html)
  - [Templates](#templates)
  - [Render Functions](#render-functions)
- [CSS](#css)
  - [SCSS](#scss)
  - [Scoped Styles](#scoped-styles)
  - [Design Variables](#design-variables)
  - [Global CSS](#global-css)
  - [CSS FAQ](#css-faq)

## TypeScript

This project uses TypeScript for type safety and improved developer experience. All `.ts` and `.vue` files are type-checked.

### Why TypeScript

- **Catch errors early** — Type errors are caught at build time, not runtime
- **Better IDE support** — Autocomplete, refactoring, and inline documentation
- **Self-documenting code** — Types serve as documentation for function signatures
- **Vue 3 designed for it** — Vue 3 and its ecosystem have first-class TypeScript support

### Configuration

TypeScript is configured in multiple files:

| File | Purpose |
|------|---------|
| `tsconfig.json` | Base configuration, references other configs |
| `tsconfig.app.json` | Application code configuration |
| `tsconfig.node.json` | Node.js tooling (Vite config, etc.) |
| `tsconfig.vitest.json` | Test configuration |

Key settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Migrating from JavaScript

If migrating an existing JavaScript codebase, enable `allowJs` in `tsconfig.json` for progressive migration:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false
  }
}
```

This allows `.js` and `.ts` files to coexist, so you can migrate file-by-file without being blocked by TypeScript errors across the entire codebase. Once migration is complete, disable `allowJs` to enforce TypeScript everywhere.

**Migration strategy:**
1. Enable `allowJs`, disable `checkJs`
2. Rename files from `.js` to `.ts` one at a time
3. Fix type errors in each file as you convert
4. Once all files are `.ts`, disable `allowJs`

### TypeScript FAQ

**How strict should we be with types?**

Aim for full type coverage, but pragmatism over perfection. Use `any` sparingly and document why when you do. The `unknown` type is often a better choice when the type is truly unknown.

**Should I use `interface` or `type`?**

- Use `interface` for object shapes that might be extended
- Use `type` for unions, primitives, and utility types

```typescript
// Interface for objects
interface User {
  id: string
  name: string
}

// Type for unions
type Status = 'pending' | 'active' | 'completed'
```

## Vue

This project uses [Vue 3](https://vuejs.org/) with the Composition API.

### Composition API

This boilerplate uses `<script setup>` syntax with the Composition API:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>
```

### Options API

The Options API is still fully supported in Vue 3 and remains a valid choice:

```vue
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return { count: 0 }
  },
  computed: {
    doubled(): number {
      return this.count * 2
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
</script>
```

### Which API to Choose?

Both APIs are production-ready. Choose based on your team's needs:

| Factor | Composition API | Options API |
|--------|-----------------|-------------|
| TypeScript | Better type inference | Requires `defineComponent` wrapper |
| Code organization | Organize by feature/concern | Organize by option type |
| Learning curve | Steeper for Vue beginners | More familiar structure |
| Logic reuse | Composables | Mixins (less flexible) |
| Bundle size | Better tree-shaking | Slightly larger |

**This boilerplate uses Composition API because:**
- Better TypeScript integration
- Composables are more flexible than mixins
- Aligns with Vue ecosystem direction

**Options API is a good choice when:**
- Team is more familiar with it
- Migrating from Vue 2 incrementally
- Simpler components that don't need composables

For a deeper comparison, read the [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html).

### Vue Router

[Vue Router 4](https://router.vuejs.org/) handles client-side routing. See [routing.md](routing.md) for project-specific patterns.

Key resources:
- [Getting Started](https://router.vuejs.org/guide/)
- [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Route Meta Fields](https://router.vuejs.org/guide/advanced/meta.html)

### Pinia

[Pinia](https://pinia.vuejs.org/) handles state management. See [state.md](state.md) for project-specific patterns.

Key resources:
- [Getting Started](https://pinia.vuejs.org/getting-started.html)
- [Defining a Store](https://pinia.vuejs.org/core-concepts/)
- [Using Stores](https://pinia.vuejs.org/core-concepts/#using-the-store)

## HTML

All HTML lives in `.vue` files, either in `<template>` blocks or render functions.

### Templates

Templates are the default and recommended approach for most components:

```vue
<template>
  <div class="user-card">
    <img :src="user.avatar" :alt="user.name" />
    <h2>{{ user.name }}</h2>
    <slot />
  </div>
</template>
```

Vue templates support:
- Self-closing tags: `<MyComponent />`
- Dynamic attributes: `:src="imageUrl"`
- Event handling: `@click="handleClick"`
- Conditional rendering: `v-if`, `v-show`
- List rendering: `v-for`

### Render Functions

Use render functions when you need the full power of JavaScript:

```typescript
import { h } from 'vue'

function render() {
  return h('div', { class: 'container' }, [
    h('h1', 'Hello'),
    h(MyComponent, { prop: value })
  ])
}
```

Render functions are rare — use templates unless you have a specific reason not to.

## CSS

This project uses SCSS with scoped styles.

```vue
<style lang="scss" scoped>
.container {
  padding: 1rem;
}
</style>
```

### SCSS

[SCSS](https://sass-lang.com/) is a superset of CSS that adds:

- [Variables](https://sass-lang.com/guide#variables): `$primary-color: #3498db;`
- [Nesting](https://sass-lang.com/guide#nesting): Nest selectors for cleaner code
- [Mixins](https://sass-lang.com/guide#mixins): Reusable style patterns
- [Functions](https://sass-lang.com/guide#functions): Color manipulation, math, etc.

Any valid CSS is valid SCSS, so you can adopt features gradually.

### Scoped Styles

The `scoped` attribute ensures styles only apply to the current component:

```vue
<style scoped>
/* This .button only affects this component */
.button {
  background: blue;
}
</style>
```

Vue adds a unique attribute (e.g., `data-v-7ba5bd90`) to elements and selectors, preventing style leakage.

**Styling child components:**

Use `:deep()` to style elements inside child components:

```vue
<style scoped>
/* Style an element inside a child component */
:deep(.child-class) {
  color: red;
}
</style>
```

Use sparingly — prefer passing props or classes to child components.

### Design Variables

For shared design tokens (colors, spacing, typography), create a variables file:

```scss
// src/styles/variables.scss
$color-primary: #3498db;
$color-secondary: #2ecc71;
$spacing-unit: 8px;
```

Import in components that need them:

```vue
<style lang="scss" scoped>
@use '@/styles/variables' as *;

.button {
  background: $color-primary;
  padding: $spacing-unit * 2;
}
</style>
```

> **Note:** With Vite, use `@use` instead of `@import` for better performance and to avoid deprecation warnings.

### Global CSS

Global styles should be minimal. Keep them in `src/styles/` and import in `main.ts`:

```typescript
// src/main.ts
import './styles/global.scss'
```

Global CSS should only contain:
- CSS resets or normalization
- Base element styles (typography, links)
- Utility classes (if not using a utility framework)

### CSS FAQ

**Why scoped styles instead of CSS Modules?**

Scoped styles are simpler and sufficient for most use cases. CSS Modules offer slightly better collision protection but add complexity. For this project, scoped styles provide the right balance.

**Why SCSS instead of plain CSS?**

SCSS offers variables, nesting, and mixins that make styles more maintainable. Since SCSS is a superset of CSS, the learning curve is minimal.

**Should I use Tailwind CSS?**

Tailwind is a valid choice for utility-first styling. It's not included by default, but can be added if the team prefers that approach. See the [Tailwind + Vite guide](https://tailwindcss.com/docs/guides/vite#vue).
