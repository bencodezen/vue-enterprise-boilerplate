# Setup and development

- [Setup and development](#setup-and-development)
  - [First-time setup](#first-time-setup)
  - [Installation](#installation)
  - [Dev server](#dev-server)
    - [Developing with the production API](#developing-with-the-production-api)
  - [Generators](#generators)
  - [Aliases](#aliases)
  - [Globals](#globals)
    - [Base components](#base-components)
  - [Docker (optional)](#docker-optional)

## First-time setup

Make sure you have the following installed:

- [Node](https://nodejs.org/en/) (at least the latest LTS)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) (at least 1.0)

Then update the following files to suit your application:

- `src/app.config.json` (provides metadata about your app)
- `.circleci/config.yml` (assuming you want to automatically [deploy to production](production.md) with continuous integration)

## Installation

```bash
# Install dependencies from package.json
yarn install
```

## Dev server

> Note: If you're on Linux and see an `ENOSPC` error when running the commands below, you must [increase the number of available file watchers](https://stackoverflow.com/questions/22475849/node-js-error-enospc#answer-32600959).

```bash
# Launch the dev server
yarn dev

# Launch the dev server and automatically open it in
# your default browser when ready
yarn dev --open

# Launch the dev server with the Cypress client for
# test-driven development in a friendly interface
yarn dev:e2e
```

### Developing with the production API

By default, dev and tests filter requests through [the mock API](/docs/tests.md#the-mock-api) in `tests/mock-api`. To test directly against a local/live API instead, run dev and test commands with the `API_BASE_URL` environment variable set. For example:

```bash
# To develop against a local backend server
API_BASE_URL=http://localhost:3000 yarn dev

# To test and develop against a production server
API_BASE_URL=https://example.io yarn dev:e2e
```

## Generators

This project includes generators to speed up common development tasks. Commands include:

```bash
# Generate a new component with adjacent unit test
yarn new component

# Generate a new view component with adjacent unit test
yarn new view

# Generate a new layout component with adjacent unit test
yarn new layout

# Generate a new Vuex module with adjacent unit test
yarn new module

# Generate a new utility function with adjacent unit test
yarn new util

# Generate a new end-to-end test
yarn new e2e
```

Update existing or create new generators in the `generators` folder, with help from the [Hygen docs](http://www.hygen.io/).

## Aliases

To simplify referencing local modules and refactoring, you can set aliases to be shared between dev and unit tests in `aliases.config.js`. As a convention, this project uses an `@` prefix to denote aliases.

## Globals

### Base components

[Base components](https://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended) (a.k.a. presentational, dumb, or pure components) that apply app-specific styling and conventions should all begin with the `_base-` prefix. Since these components are typically used in place of raw HTML element (and thus used as frequently), they're automatically globally registered for convenience. This means you don't have to import and locally register them to use them in templates.

## Docker (optional)

If you'd prefer to use Docker for development, it's recommended to install and run [Docker Desktop](https://www.docker.com/products/docker-desktop). Once the app is started, you'll be able to run commands like:

```bash
# Build and run a containerized version of your app in the background
docker-compose up --detach
```

Once your container has started, you can run any script from `package.json` inside the container by prefixing the command with `yarn docker` instead of just `yarn`. For example:

```bash
# Install dependencies in the container
yarn docker install

# Run the dev environment in the container
yarn docker dev

# Run tests in the container
yarn docker test
```

To list your containers and their statuses, you can run:

```bash
docker-compose ps
```

To stop your running containers, run:

```bash
docker-compose stop
```

If ever update the following files:

- `.dockerignore`
- `docker-compose.yml`
- `docker-dev.dockerfile`

Then you'll want to stop and remove all containers, networks, volumes, and images created for your app with:

```bash
docker-compose down --volumes --rmi all --remove-orphans
```

This command can also be useful in case something goes wrong with a container and you'd like to start over. All containers, networks, volumes, and images defined in `docker-compose.yml` will be rebuilt the next time you run `docker-compose up`.

See the docs for [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for more information on how to use and configure Docker tooling.
