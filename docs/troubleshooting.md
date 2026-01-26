# Troubleshooting

Common issues and solutions for development.

- [Script Errors](#script-errors)
- [VS Code Issues](#vs-code-issues)
- [TypeScript Errors](#typescript-errors)
- [Vite / Build Issues](#vite--build-issues)
- [Vue-Specific Issues](#vue-specific-issues)

## Script Errors

**Problem:** Errors when running `pnpm dev` or other scripts.

**Solution 1:** Fresh install dependencies

```bash
# Delete node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml

# Reinstall
pnpm install
```

**Solution 2:** Use lockfile from known working state

```bash
rm -rf node_modules

# Restore lockfile from main branch
git checkout origin/main -- pnpm-lock.yaml

# Install with frozen lockfile
pnpm install --frozen-lockfile
```

If this fixes the issue, a dependency update likely caused the problem. Use `pnpm outdated` to identify candidates, then upgrade one at a time to find the culprit.

## VS Code Issues

**Problem:** Files formatted incorrectly on save.

**Cause:** Conflicting formatter extensions or incorrect default formatter.

**Solution:**

1. Ensure Prettier is the default formatter in `.vscode/settings.json`:
   ```json
   {
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

2. Disable or uninstall conflicting formatters (e.g., Beautify, Format)

3. If using Volar, ensure Vetur is uninstalled (they conflict)

**Problem:** Vue files show errors but code works fine.

**Solution:** Restart the Vue language server:
- Open Command Palette (`Cmd+Shift+P`)
- Run "Vue: Restart Vue Server"

## TypeScript Errors

**Problem:** Type errors in IDE but build succeeds (or vice versa).

**Solution:** Restart the TypeScript server:
- Open Command Palette (`Cmd+Shift+P`)
- Run "TypeScript: Restart TS Server"

**Problem:** Types not recognized for auto-imported components/composables.

**Solution:** Ensure generated type files exist:
```bash
# Run dev server to generate types
pnpm dev

# Check these files exist:
# - components.d.ts
# - auto-imports.d.ts
```

Add them to `.gitignore` but not to `tsconfig.json` excludes.

**Problem:** "Cannot find module" for path aliases like `@/`.

**Solution:** Ensure `tsconfig.app.json` has matching paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Vite / Build Issues

**Problem:** Dev server starts but page is blank.

**Solution:** Check browser console for errors. Common causes:
- Missing environment variables (check `.env` files)
- Syntax error in a component
- Failed import (check file paths and extensions)

**Problem:** Build succeeds but production app doesn't work.

**Solution:** Test with preview server:
```bash
pnpm build
pnpm preview
```

Check for:
- Hardcoded `localhost` URLs (use environment variables)
- Missing environment variables in production
- SSR-incompatible code if using SSR

**Problem:** "Failed to resolve import" errors.

**Solution:**
- Check the import path is correct
- Ensure the file extension is included for non-JS/TS files
- For external packages, ensure they're in `dependencies` not just `devDependencies`

## Vue-Specific Issues

**Problem:** Reactivity not working (changes don't update UI).

**Common causes:**
```typescript
// ❌ Destructuring loses reactivity
const { count } = useCounterStore()

// ✅ Use storeToRefs
const { count } = storeToRefs(useCounterStore())

// ❌ Replacing reactive object
const state = reactive({ items: [] })
state = { items: newItems } // Loses reactivity

// ✅ Mutate properties instead
state.items = newItems
```

**Problem:** "Hydration mismatch" warnings (SSR).

**Cause:** Server and client rendered different HTML.

**Solution:**
- Wrap client-only code in `<ClientOnly>` or `onMounted`
- Don't use `Date.now()` or `Math.random()` during render
- Ensure async data is fetched the same way on server and client

**Problem:** Component not updating when prop changes.

**Solution:** Ensure you're not caching the prop value:
```typescript
// ❌ Caches initial value
const localValue = props.value

// ✅ Stays reactive
const localValue = computed(() => props.value)

// ✅ Or use toRef
const localValue = toRef(props, 'value')
```

---

Still stuck? Check the [Vue documentation](https://vuejs.org/) or open an issue with:
- Steps to reproduce
- Expected vs actual behavior
- Error messages (full stack trace)
- Node/pnpm versions (`node -v`, `pnpm -v`)
