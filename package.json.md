# [`package.json`](https://docs.npmjs.com/files/package.json)

This document serves as a replace for comments in `package.json`, since it includes a lot of configuration often requiring explanation.

## [`name`](https://docs.npmjs.com/files/package.json#name)

This field is used by the [Vue CLI UI](https://cli.vuejs.org/guide/creating-a-project.html#using-the-gui) and sometimes other tooling to display the name of the project.

## [`version`](https://docs.npmjs.com/files/package.json#version)

This field often isn't useful for applications, but some tooling complains or even breaks if `version` is missing.

## [`private`](https://docs.npmjs.com/files/package.json#private)

This field indicates to tooling that this project contains private source code, preventing it from being accidentally published to public registries such as NPM.

## [`scripts`](https://docs.npmjs.com/files/package.json#scripts)

This field allows you to define commands that can be run from the terminal and sometimes [from editors](https://code.visualstudio.com/docs/editor/tasks). For example, in the following script:

```json
"dev": "vue-cli-service serve"
```

The name is `dev`, allowing you to run the script using `yarn dev`. When the script is run, it will execute the code: `vue-cli-service serve`. In this case, `vue-cli-service` is a binary installed to `node_modules/.bin`, provided by our `@vue/cli-service` dev dependency. All scripts in `package.json` have access to both globally installed binaries and those provided by local dependencies.

## [`gitHooks`](https://github.com/yyx990803/yorkie#yorkie)

This field works is provided by [yorkie](https://github.com/yyx990803/yorkie) and works similarly to `scripts`, except the key of each field is the name of a [client-side Git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks#_client_side_hooks) that runs automatically at a specific point in your Git workflow.

This project is currently configured to run checks defined in `lint-staged.config.js` on every file staged for commit, before allowing that commit to proceed. This prevents certain runtime errors, style violations, debugging code, and failing unit tests from accidentally being committed to the codebase.

## [`dependencies`](https://docs.npmjs.com/files/package.json#dependencies)

This field allows you to define dependencies that will be included in your bundled source code. Running `yarn add` will add dependencies to this list.

Since changes to these dependencies directly affect the code you ship, they're all locked to specific versions rather than using version ranges. Somewhere between a weekly and monthly basis, it's recommended to run `yarn outdated` to see what new versions have been released, then review the changelogs for each outdated dependency to determine:

- Whether you want to upgrade.

- Whether upgrading would require code changes (e.g. even a patch release fixing a bug may require you to update code that was previously working around or even relying on that bug).

- Whether upgrading might change your application's roadmap (e.g. a new feature may open possibilities that were previously inconceivable, unfeasible, or not worth the time).

Once you've determined how you'd like to proceed, you can update these versions manually and re-run `yarn` to install the new versions.

## [`devDependencies`](https://docs.npmjs.com/files/package.json#devdependencies)

This field allows you to define dev dependencies, which are _not_ included in your bundled source code, but instead used in development for code compilation/transformation, development servers, tests, and other development tasks. Running `yarn add --dev` will add dependencies to this list.

A few notable conventions:

- Instead of using `^`/`~` to specify version ranges, we're using `x` as a wildcard. For example, `1.2.x` will use the latest patch release of version `1.2`. The `x` notation tends to be much more intuitive to developers and `yarn.lock` already ensures a minimum patch version when one is needed.

- All dev dependencies using stable versions (e.g. _not_ `alpha`, `beta`, `rc`, `next`, etc) are locked to a minor version (e.g. `1.2.x`). This allows dev dependency bugs to be automatically fixed with `yarn upgrade`, while still requiring major/minor version upgrades to be done manually. It's strongly recommended to always check changelogs before upgrading to a new major or minor version. With a new major version, there are likely to be breaking changes requiring updates to your project's non-source code. With a new minor version, there are often new features that are important to be aware of, because they could improve the productivity of your team.

- Any dev dependencies using pre-release versions point to a specific version, rather than a version range, because any new version of pre-release software could contain breaking changes.

- The version of `vue-template-compiler` must always match the version of `vue` specified in `dependencies`.

### `babel-jest`

For users installing with NPM, there seems to be a bug in NPM module resolution (and possibly in `babel-jest`) that results in [Jest errors](https://github.com/chrisvfritz/vue-enterprise-boilerplate/issues/77) when using `babel-jest` >=24.

### `eslint-plugin-vue`

This package is locked to a specific commit until version >=5.3 is released, which should include all the uncategorized rules listed in `.eslintrc.js`.

## [`engines`](https://docs.npmjs.com/files/package.json#engines)

This field allows you to define specific versions for globally installed runtimes and tooling, such as [Node](https://nodejs.org) and [Yarn](https://yarnpkg.com). Ensuring that everyone on your team meets a minimum version threshold can vastly simplify debugging issues that only some developers experience.

## [`browserlist`](https://flaviocopes.com/package-json/#browserslist)

This field defines the browser ranges this project supports, used to determine which polyfills and helpers must be added by code compilers.
