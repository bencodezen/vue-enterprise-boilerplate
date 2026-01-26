# Building and Deploying to Production

- [Building for Production](#building-for-production)
- [Previewing the Build](#previewing-the-build)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)

## Building for Production

```bash
# Build for production
pnpm build
```

This runs TypeScript type checking and then builds optimized assets into the `dist/` directory.

The build process:

1. Type checks with `vue-tsc`
2. Bundles and minifies with Vite
3. Outputs to `dist/` with hashed filenames for cache busting

## Previewing the Build

Before deploying, you can preview the production build locally:

```bash
# Preview the production build
pnpm preview
```

This serves the `dist/` directory on a local server, letting you verify the build works correctly.

## Environment Variables

Vite uses `.env` files for environment-specific configuration:

| File                    | Purpose                              |
| ----------------------- | ------------------------------------ |
| `.env`                  | Default values (committed)           |
| `.env.local`            | Local overrides (not committed)      |
| `.env.production`       | Production values (committed)        |
| `.env.production.local` | Production overrides (not committed) |

Variables must be prefixed with `VITE_` to be exposed to client code:

```bash
# .env.production
VITE_API_BASE_URL=https://api.example.com
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

> **Security:** Never put secrets in `VITE_` variables — they're embedded in the client bundle and visible to users.

## Deployment

The `dist/` directory contains static files that can be deployed to any static hosting service:

### SPA Routing

If using client-side routing (Vue Router in history mode), configure your server to redirect all requests to `index.html`. See the [Vue Router deployment guide](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations) for server-specific examples.
