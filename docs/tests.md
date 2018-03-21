# Tests and mocking the API

* [Running all tests](#running-all-tests)
* [Unit tests with Jest](#unit-tests-with-jest)
  * [Running unit tests](#running-unit-tests)
  * [Introduction to Jest](#introduction-to-jest)
  * [Unit test files](#unit-test-files)
  * [Unit test helpers](#unit-test-helpers)
  * [Unit test mocks](#unit-test-mocks)
* [End-to-end tests with Cypress](#end-to-end-tests-with-cypress)
  * [Running end-to-end tests](#running-end-to-end-tests)
  * [Introduction to Cypress](#introduction-to-cypress)
* [The mock API](#the-mock-api)
  * [Testing/developing against a real server](#testingdeveloping-against-a-real-server)

## Running all tests

```sh
# Run all tests
yarn test
```

## Unit tests with Jest

### Running unit tests

```sh
# Run unit tests
yarn unit

# Run unit tests in watch mode
yarn unit:watch
```

### Introduction to Jest

For unit tests, we use Jest with the `describe`/`expect` syntax. If you're not familiar with Jest, I recommend first browsing through the existing tests to get a sense for them.

Then at the very least, read about:

* [Jest's matchers](https://facebook.github.io/jest/docs/en/expect.html) for examples of other assertions you can make
* [Testing async code](https://facebook.github.io/jest/docs/en/asynchronous.html)
* [Setup and teardown](https://facebook.github.io/jest/docs/en/setup-teardown.html)

### Unit test files

Configuration for Jest is in `jest.config.js`, support files are in `tests/unit`, but as for the tests themselves - they're first-class citizens. That means they live alongside our source files, using the same name as the file they test, but with the extension `.unit.js`.

This may seem strange at first, but it makes poor test coverage obvious from a glance, even for those less familiar with the project. It also lowers the barrier to adding tests before creating a new file, adding a new feature, or fixing a bug.

### Unit test helpers

See [`tests/unit/setup.js`](../tests/unit/setup.js) for a list of helpers, including documentation in comments.

### Unit test mocks

Jest offers many tools for mocks, including:

* [For a function](https://facebook.github.io/jest/docs/en/mock-functions.html), use `jest.fn()`.
* [For a source file](https://facebook.github.io/jest/docs/en/manual-mocks.html#mocking-user-modules), add the mock to a `__mocks__` directory adjacent to the file.
* [For a dependency in `node_modules`](https://facebook.github.io/jest/docs/en/manual-mocks.html#mocking-node-modules), add the mock to `tests/unit/__mocks__`. You can see an example of this with the `axios` mock, which intercepts requests with relative URLs to either [our mock API](#the-mock-api) or a local/live API if the `API_BASE_URL` environment variable is set.

## End-to-end tests with Cypress

### Running end-to-end tests

```sh
# Run end to end tests
yarn e2e

# Run the dev server with the Cypress client
yarn dev:e2e
```

### Introduction to Cypress

Cypress offers many advantages over other test frameworks, including the abilities to:

* Travel through time to dissect the source of a problem when a test fails
* Automatically record video and screenshots of your tests
* Easily test in a wide range of screen sizes

And much more! I recommend checking out our Cypress tests in `tests/e2e/specs`, then reading through at least these sections of the excellent Cypress docs:

* [Core Concepts](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Is-Simple)
* [Best Practices](https://docs.cypress.io/guides/references/best-practices.html)

Beyond that, also know that you can access our app in Cypress on the `window`. For example, to dispatch a Vuex action that sets up some state:

```js
cy.window().then(window => {
  return window.__app__.$store.dispatch('someModule/someAction')
})
```

## The mock API

Working against the production API can be useful sometimes, but it also has some disadvantages:

* Networks requests are slow, which slows down both development and testing.
* Development and testing become dependent on a stable network connection.
* Hitting the production API often means modifying the production database, which you typically don't want to do during automated tests.
* To work on a frontend feature, the backend for it must already be complete.

The mock API is an [Express](https://expressjs.com/) server in `tests/mock-api` you can extend to - you guessed it - mock what the real API would do, solving all the problems listed above. This solution is also backend-agnostic, making it ideal for a wide variety of projects.

### Testing/developing against a real server

In some situations, you might prefer to test against a local server while developing, or maybe just during continuous integration. To do so, you can run any development or test command with the `API_BASE_URL` environment variable. For example:

```sh
API_BASE_URL=http://localhost:3000 yarn test
```

Or similarly, with a live server:

```sh
API_BASE_URL=https://staging.example.io yarn test
```
