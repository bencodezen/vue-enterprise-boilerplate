# State Management

- [Overview](#overview)
- [Defining Stores](#defining-stores)
- [Using Stores](#using-stores)
- [Store Organization](#store-organization)
- [When to Use Stores](#when-to-use-stores)

## Overview

This project uses [Pinia](https://pinia.vuejs.org/) for state management. Pinia is the official state management library for Vue 3, replacing Vuex.

**Why Pinia over Vuex?**

- Simpler API — no mutations, just state and actions
- Full TypeScript support with type inference
- Composition API style with `ref` and `computed`
- Devtools integration
- Lighter weight

Stores live in `src/stores/`.

## Defining Stores

Use the Composition API style (setup stores) for consistency with components:

```typescript
// src/stores/authStore.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  // Getters (computed)
  const isAuthenticated = computed(() => !!token.value)

  // Actions
  async function login(credentials: Credentials) {
    const response = await api.login(credentials)
    user.value = response.user
    token.value = response.token
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return { user, token, isAuthenticated, login, logout }
})
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| File name | `[domain]Store.ts` | `authStore.ts`, `cartStore.ts` |
| Export name | `use[Domain]Store` | `useAuthStore`, `useCartStore` |
| Store ID | `[domain]Store` | `'authStore'`, `'cartStore'` |

**Avoid single-word names** — Be specific about what the store manages. Use `userProfileStore` instead of `user`, `shoppingCartStore` instead of `cart` if needed for clarity.

## Using Stores

Import and use stores in components:

```vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div v-if="authStore.isAuthenticated">
    <p>Welcome, {{ authStore.user?.name }}</p>
    <button @click="authStore.logout">Logout</button>
  </div>
  <div v-else>
    <button @click="showLogin">Login</button>
  </div>
</template>
```

### Destructuring with Reactivity

Use `storeToRefs` to destructure while maintaining reactivity:

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)
const { login, logout } = authStore // Actions don't need storeToRefs
</script>
```

## Store Organization

Keep stores focused on a single domain:

```
src/stores/
├── authStore.ts      # Authentication state
├── cartStore.ts      # Shopping cart
├── userStore.ts      # User profile
└── productStore.ts   # Product catalog
```

### Composing Stores

Stores can use other stores:

```typescript
// src/stores/cartStore.ts
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

export const useCartStore = defineStore('cartStore', () => {
  const authStore = useAuthStore()

  async function checkout() {
    if (!authStore.isAuthenticated) {
      throw new Error('Must be logged in to checkout')
    }
    // ... checkout logic
  }

  return { checkout }
})
```

## When to Use Stores

**Use Pinia stores for:**

- Authentication state (current user, tokens)
- Data shared across multiple components
- Data that persists across route changes
- Complex state with many actions

**Use local component state for:**

- Form inputs
- UI state (modals, dropdowns)
- Data used by a single component
- Temporary state that resets on navigation

**Rule of thumb:** Start with local state. Extract to a store when you need to share state across components or persist it across routes.
