# Tests and mocking the API

- [Tests and mocking the API](#tests-and-mocking-the-api)
  - [Running all tests](#running-all-tests)
  - [Unit tests with Jest](#unit-tests-with-jest)
    - [Running unit tests](#running-unit-tests)
    - [Introduction to Jest](#introduction-to-jest)
    - [Unit test files](#unit-test-files)
    - [Unit test helpers](#unit-test-helpers)
    - [Unit test mocks](#unit-test-mocks)
  - [End-to-end tests with Cypress](#end-to-end-tests-with-cypress)
    - [Running end-to-end tests](#running-end-to-end-tests)
    - [Introduction to Cypress](#introduction-to-cypress)
    - [Accessibility-driven end-to-end tests](#accessibility-driven-end-to-end-tests)
  - [The mock API](#the-mock-api)
    - [Mock authentication](#mock-authentication)
    - [Testing/developing against a real server](#testingdeveloping-against-a-real-server)

## Running all tests

```bash
# Run all tests
yarn test
```

## Unit tests with Jest

### Running unit tests

```bash
# Run unit tests
yarn test:unit

# Run unit tests in watch mode
yarn test:unit:watch
```

### Introduction to Jest

For unit tests, we use Jest with the `describe`/`expect` syntax. If you're not familiar with Jest, I recommend first browsing through the existing tests to get a sense for them.

Then at the very least, read about:

- [Jest's matchers](https://facebook.github.io/jest/docs/en/expect.html) for examples of other assertions you can make
- [Testing async code](https://facebook.github.io/jest/docs/en/asynchronous.html)
- [Setup and teardown](https://facebook.github.io/jest/docs/en/setup-teardown.html)

### Unit test files

Configuration for Jest is in `jest.config.js`, support files are in `tests/unit`, but as for the tests themselves - they're first-class citizens. That means they live alongside our source files, using the same name as the file they test, but with the extension `.unit.js`.

This may seem strange at first, but it makes poor test coverage obvious from a glance, even for those less familiar with the project. It also lowers the barrier to adding tests before creating a new file, adding a new feature, or fixing a bug.

### Unit test helpers

See [`tests/unit/setup.js`](../tests/unit/setup.js) for a list of helpers, including documentation in comments.

### Unit test mocks

Jest offers many tools for mocks, including:

- [For a function](https://facebook.github.io/jest/docs/en/mock-functions.html), use `jest.fn()`.
- [For a source file](https://facebook.github.io/jest/docs/en/manual-mocks.html#mocking-user-modules), add the mock to a `__mocks__` directory adjacent to the file.
- [For a dependency in `node_modules`](https://facebook.github.io/jest/docs/en/manual-mocks.html#mocking-node-modules), add the mock to `tests/unit/__mocks__`. You can see an example of this with the `axios` mock, which intercepts requests with relative URLs to either [our mock API](#the-mock-api) or a local/live API if the `API_BASE_URL` environment variable is set.

## End-to-end tests with Cypress

### Running end-to-end tests

```bash
# Run end to end tests
yarn test:e2e

# Run the dev server with the Cypress client
yarn dev:e2e
```

### Introduction to Cypress

Cypress offers many advantages over other test frameworks, including the abilities to:

- Travel through time to dissect the source of a problem when a test fails
- Automatically record video and screenshots of your tests
- Easily test in a wide range of screen sizes

And much more! I recommend checking out our Cypress tests in `tests/e2e/specs`, then reading through at least these sections of the excellent Cypress docs:

- [Core Concepts](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Is-Simple)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices.html)

Beyond that, also know that you can access our app in Cypress on the `window`. For example, to dispatch a Vuex action that sets up some state:

```js
cy.window().then((window) => {
  return window.__app__.$store.dispatch('someModule/someAction')
})
```

### Accessibility-driven end-to-end tests

Ideally, tests should only fail when either:

- something is actually broken, or
- the requirements have changed

Unfortunately, there are _a lot_ of ways to get this wrong. For example, when creating a selector for a login link:

```js
cy.get('a')
// Too general, as there could be many links

cy.get('.login-link')
// Tied to implementation detail of CSS

cy.get('#login-link')
// Tied to implementation detail of JS and prevents component reusability

cy.contains('Log in')
// Assumes the text only appears in one context
```

To create the right selector, think from the perspective of the user. What _exactly_ are they looking for? They're not looking for:

```js
cy.get('a')
// Any link

cy.get('.login-link')
// An element with a specific class

cy.get('#login-link')
// An element with a specific id

cy.contains('Log in')
// Specific text anywhere on the page
```

But rather:

```js
cy.contains('a', 'Log in')
// A link containing the text "Log in"
```

Note that we're targeting a **semantic element**, meaning that it tells the web browser (and users) something about the element's role within the page. Also note that we're trying to be **as general as possible**. We're not looking for the link in a specific place, like a navbar or sidebar (unless that's part of the requirements), and we're not overly specific with the content. The link may also contain other content, like an icon, but that won't break the test, because we only care that _some link_ contains the text "Log in" _somewhere_ inside it.

Now, some will be thinking:

> "But isn't this brittle? Wouldn't it be better to add another attribute to the link, like `data-testid="login-link`? Then we could target that attribute and even if the element or content changes, the test won't break."

I would argue that if the link's semantic element or content changes so drastically that it's no longer an anchor and doesn't even contain the text "Log in" anymore, the requirements _have_ changed, so the test _should_ break. And from an accessibility perspective, the app might indeed be broken.

For example, let's imagine you replaced "Log in" with an icon:

```html
<a href="/login">
  <span class="icon icon-login"></span>
</a>
```

Now users browsing your page with a screen reader will have no way to find the login link. From their perspective, this is just a link with no content. You may be tempted to try to fix the test with something like:

```js
cy.get('a[href="/login"]')
// A link going to "/login"
```

But when you're trying to find a login link as a user, you don't just inspect the destination of unlabeled links until you find one that looks like it's possibly a login page. That would be a very slow and painful experience!

Instead, thinking from a user's perspective forces you to stay accessible, perhaps updating your generated HTML to:

```html
<a aria-label="Log in" href="/login">
  <span aria-hidden="true" class="icon icon-login"></span>
</a>
```

Then the selector in your test can update as well:

```js
cy.get('a[aria-label*="Log in"]')
// A link with a label containing the text "Log in"
```

And the app now works for everyone:

- Sighted users will see an icon that they'll (hopefully) have the cultural context to interpret as "Log in".
- Non-sighted users get a label with the text "Log in" read to them.

This strategy could be called **accessibility-driven end-to-end tests**, because you're parsing your own app with the same mindset as your users. It happens to be great for accessibility, but also helps to ensure that your app always breaks when requirements change, but never when you've just changed the implementation.

## The mock API

Working against the production API can be useful sometimes, but it also has some disadvantages:

- Networks requests are slow, which slows down both development and testing.
- Development and testing become dependent on a stable network connection.
- Hitting the production API often means modifying the production database, which you typically don't want to do during automated tests.
- To work on a frontend feature, the backend for it must already be complete.

The mock API is an [Express](https://expressjs.com/) server in `tests/mock-api` you can extend to - you guessed it - mock what the real API would do, solving all the problems listed above. This solution is also backend-agnostic, making it ideal for a wide variety of projects.

### Mock authentication

See the [`users` resource](../tests/mock-api/resources/users.js) in the mock API for a list of usernames and passwords you can use in development.

### Testing/developing against a real server

In some situations, you might prefer to test against a local server while developing, or maybe just during continuous integration. To do so, you can run any development or test command with the `API_BASE_URL` environment variable. For example:

```bash
API_BASE_URL=http://localhost:3000 yarn test
```

Or similarly, with a live server:

```bash
API_BASE_URL=https://staging.example.io yarn test
```
