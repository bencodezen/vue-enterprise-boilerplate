# Routing, Layouts, and Pages

- [Overview](#overview)
- [Route Configuration](#route-configuration)
- [Layouts](#layouts)
- [Pages](#pages)
- [Navigation Guards](#navigation-guards)
- [Lazy Loading](#lazy-loading)

## Overview

This project uses [Vue Router 4](https://router.vuejs.org/) for client-side routing:

| File | Purpose |
|------|---------|
| `src/router/index.ts` | Router initialization |
| `src/router/routes.ts` | Route definitions |
| `src/layouts/` | Layout components |
| `src/pages/` | Page components |

## Route Configuration

Routes are defined in `src/router/routes.ts`:

```typescript
export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/about.vue')
  }
]
```

The router is created in `src/router/index.ts`:

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

## Layouts

Layout components provide shared structure (header, footer, navigation) around page content. They live in `src/layouts/`.

```vue
<!-- src/layouts/AppLayout.vue -->
<script setup lang="ts"></script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
```

Use layouts by wrapping page content:

```vue
<!-- src/pages/index.vue -->
<template>
  <AppLayout>
    <h1>Home Page</h1>
    <!-- Page content -->
  </AppLayout>
</template>
```

Or use nested routes for layout-based routing:

```typescript
{
  path: '/',
  component: () => import('@/layouts/AppLayout.vue'),
  children: [
    { path: '', component: () => import('@/pages/index.vue') },
    { path: 'about', component: () => import('@/pages/about.vue') }
  ]
}
```

## Pages

Page components are the top-level components rendered for each route. They live in `src/pages/` and typically:

- Use a layout component for consistent structure
- Fetch data needed for the page
- Compose smaller components together

Keep pages focused on orchestration — extract complex logic into composables and UI into components.

## Navigation Guards

Use navigation guards for authentication, authorization, and data fetching:

```typescript
// src/router/routes.ts
{
  path: '/dashboard',
  component: () => import('@/pages/dashboard.vue'),
  meta: { requiresAuth: true }
}

// src/router/index.ts
router.beforeEach((to, from) => {
  const auth = useAuth()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

Define guards in the router (not components) because:

- Guard logic often applies to multiple routes
- Keeps page components focused on rendering
- Easier to test in isolation

## Lazy Loading

All routes use dynamic imports for automatic code splitting:

```typescript
// Each page becomes a separate chunk
component: () => import('@/pages/about.vue')
```

This means users only download the code for pages they visit, improving initial load time.

For related pages that are often visited together, you can group them into a named chunk:

```typescript
component: () => import(/* webpackChunkName: "settings" */ '@/pages/settings/profile.vue')
```
