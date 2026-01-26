# Testing

- [Overview](#overview)
- [Unit Tests with Vitest](#unit-tests-with-vitest)
  - [Running Unit Tests](#running-unit-tests)
  - [Writing Unit Tests](#writing-unit-tests)
  - [Testing Composables](#testing-composables)
  - [Testing Components](#testing-components)
  - [Mocking](#mocking)
- [End-to-End Tests with Playwright](#end-to-end-tests-with-playwright)
  - [Running E2E Tests](#running-e2e-tests)
  - [Writing E2E Tests](#writing-e2e-tests)
  - [Accessibility-Driven Testing](#accessibility-driven-testing)
- [Test Organization](#test-organization)
- [Mock API](#mock-api)

## Overview

This project uses two testing frameworks:

| Type | Framework | Purpose |
|------|-----------|---------|
| Unit | [Vitest](https://vitest.dev/) | Test functions, composables, and components in isolation |
| E2E | [Playwright](https://playwright.dev/) | Test complete user flows in real browsers |

## Unit Tests with Vitest

### Running Unit Tests

```bash
# Run unit tests once
pnpm test:unit

# Run in watch mode (re-runs on file changes)
pnpm test:unit --watch

# Run with coverage report
pnpm test:unit --coverage
```

### Writing Unit Tests

Vitest uses the same API as Jest (`describe`, `it`, `expect`):

```typescript
// src/utils/formatDate.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats date in default format', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('January 15, 2024')
  })

  it('handles invalid dates', () => {
    expect(formatDate(null)).toBe('')
  })
})
```

### Testing Composables

Test composables by calling them and asserting on their returned values:

```typescript
// src/composables/useCounter.test.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { count } = useCounter()
    expect(count.value).toBe(0)
  })

  it('increments count', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })

  it('accepts initial value', () => {
    const { count } = useCounter(10)
    expect(count.value).toBe(10)
  })
})
```

### Testing Components

Use `@vue/test-utils` for component testing:

```typescript
// src/components/BaseButton.test.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from './BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: { default: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('is disabled when prop is set', () => {
    const wrapper = mount(BaseButton, {
      props: { disabled: true }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
```

### Mocking

Vitest provides several mocking utilities:

```typescript
import { vi, describe, it, expect } from 'vitest'

// Mock a function
const mockFn = vi.fn()
mockFn('arg')
expect(mockFn).toHaveBeenCalledWith('arg')

// Mock a module
vi.mock('@/services/api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: '1', name: 'Test' }))
}))

// Mock timers
vi.useFakeTimers()
vi.advanceTimersByTime(1000)
vi.useRealTimers()
```

## End-to-End Tests with Playwright

### Running E2E Tests

```bash
# Run E2E tests headlessly
pnpm test:e2e

# Run with UI mode (interactive)
pnpm test:e2e:ui

# Run specific test file
pnpm test:e2e e2e/login.spec.ts
```

### Writing E2E Tests

E2E tests live in the `e2e/` directory:

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test('user can log in', async ({ page }) => {
  await page.goto('/login')

  await page.getByLabel('Email').fill('user@example.com')
  await page.getByLabel('Password').fill('password123')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText('Welcome back')).toBeVisible()
})

test('shows error for invalid credentials', async ({ page }) => {
  await page.goto('/login')

  await page.getByLabel('Email').fill('wrong@example.com')
  await page.getByLabel('Password').fill('wrongpassword')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByText('Invalid credentials')).toBeVisible()
})
```

### Accessibility-Driven Testing

Write selectors from the user's perspective using semantic queries:

```typescript
// Prefer role-based selectors
await page.getByRole('button', { name: 'Submit' })
await page.getByRole('link', { name: 'Log in' })
await page.getByRole('textbox', { name: 'Email' })

// Use labels for form fields
await page.getByLabel('Password')

// Use text for content
await page.getByText('Welcome back')

// Avoid implementation details
// ❌ page.locator('.login-btn')
// ❌ page.locator('#submit-button')
// ❌ page.locator('[data-testid="login"]')
```

**Why accessibility-driven selectors?**

- Tests break when requirements change, not when implementation changes
- Forces you to write accessible HTML (labels, ARIA attributes)
- Mirrors how real users interact with your app

If a selector is hard to write, it's often a sign the HTML needs better accessibility:

```html
<!-- Hard to select (no label) -->
<input type="text" class="email-input" />

<!-- Easy to select -->
<label>
  Email
  <input type="text" />
</label>
```

## Test Organization

```
project/
├── src/
│   ├── composables/
│   │   ├── useAuth.ts
│   │   └── useAuth.test.ts      # Unit test next to source
│   └── components/
│       ├── BaseButton.vue
│       └── BaseButton.test.ts   # Unit test next to source
├── e2e/
│   ├── login.spec.ts            # E2E tests in dedicated folder
│   └── checkout.spec.ts
├── vitest.config.ts
└── playwright.config.ts
```

**Unit tests** live alongside source files (`*.test.ts`). This makes poor coverage obvious and lowers the barrier to adding tests.

**E2E tests** live in `e2e/` directory, organized by user flow or feature.

## Mock API

For development and testing without a backend, you can mock API responses:

**Option 1: MSW (Mock Service Worker)**

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ id: '1', name: 'Test User' })
  }),
  http.post('/api/login', async ({ request }) => {
    const { email } = await request.json()
    if (email === 'user@example.com') {
      return HttpResponse.json({ token: 'fake-token' })
    }
    return new HttpResponse(null, { status: 401 })
  })
]
```

**Option 2: Environment variable for real API**

```bash
# Test against a staging server
VITE_API_BASE_URL=https://staging.example.com pnpm test:e2e
```

See [development.md](development.md) for more on environment variables.
