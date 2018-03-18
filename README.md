# Vue Enterprise Boilerplate

[![CircleCI](https://circleci.com/gh/chrisvfritz/vue-enterprise-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/chrisvfritz/vue-enterprise-boilerplate/tree/master)

> This is an ever-evolving, very opinionated architecture and dev environment for new Vue SPA projects using [Vue CLI 3](https://github.com/vuejs/vue-cli). Questions, feedback, and for now, even bikeshedding are welcome. 😄 If you'd like to increase the time I can spend on this project, as well as other Vue resources, **please consider becoming a [sponsor on Patreon](https://www.patreon.com/chrisvuefritz)**. :pray:

**:warning: This project uses Vue CLI 3, which is currently in beta so may not yet be appropriate for production projects.**

## Features

* [**Thorough documentation**](#documentation): Written with the same care as Vue's core docs to quickly train new team members and consolidate knowledge.
* [**Guaranteed consistency**](docs/linting.md): Opinionated linting for Vue, JavaScript/JSON, SCSS, and Markdown, integrated into Visual Studio Code and run against staged files on pre-commit.
* [**First-class tests**](docs/tests.md): Practice test-driven development with both unit and end-to-end tests. Unit tests with Jest live as first-class citizens alongside your source files, while Cypress provides reliable end-to-end tests in an intuitive GUI for development.
* [**Speedy development**](docs/development.md): Between [configurable generators](docs/development.md#generators), [handy aliases](docs/development.md#aliases), and [global base components](docs/development.md#base-components), your productivity will skyrocket.

## Getting started

```sh
# 1. Clone the repository.
git clone https://github.com/chrisvfritz/vue-enterprise-boilerplate.git my-new-project --depth 1

# 2. Enter your newly-cloned folder
cd my-new-project

# 3. Replace this README's CI badge with a note about when you started
# and a link to a compare URL, so that you can always get an overview
# of new features added to the boilerplate since you did.
node _start.js

# 4. Delete the start script, as there can be only one beginning.
rm _start.js
```

## Documentation

This project includes a `docs` folder with more details on:

1.  [Setup and development](docs/development.md)
1.  [Architecture](docs/architecture.md)
1.  [Languages and technologies](docs/tech.md)
1.  [Routing, layouts, and views](docs/routing.md)
1.  [State management](docs/state.md)
1.  [Tests and mocking the API](docs/tests.md)
1.  [Linting and formatting](docs/linting.md)
1.  [Editor integration](docs/editors.md)
1.  [Building and deploying to production](docs/production.md)
