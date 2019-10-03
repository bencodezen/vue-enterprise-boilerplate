# State management

- [State management](#state-management)
  - [Modules](#modules)
  - [Helpers](#helpers)
  - [Module Nesting](#module-nesting)

## Modules

The `src/state/modules` directory is where all shared application state lives. Any JS file added here (apart from unit tests) will be automatically registered in the store as a [namespaced module](https://vuex.vuejs.org/en/modules.html#namespacing).

Read more in the [Vuex modules](https://vuex.vuejs.org/en/modules.html) docs.

## Helpers

The state helpers in `helpers.js` are the components' interface to the Vuex store. Depending on a component's concerns, we can import a subset of these helpers to quickly bring in the data and actions we need.

You might be thinking, "Why not just automatically inject all of these into every component?" Well, then it would be difficult to figure out where a particular part of state is coming from. As our state becomes increasingly complex, the risk would also increase of accidentally using the same names for internal component state. This way, each component remains traceable, as the necessary `import` will provide a thread back to our helpers file if we ever don't understand where something is coming from.

Here's an example:

```js
import { authComputed } from '@state/helpers'

export default {
  computed: {
    ...authComputed,
  },
}
```

## Module Nesting

Vuex modules can be nested, which sometimes makes sense for organizational purposes. For example, if you created these files:

```js
// @file src/state/modules/dashboard.js

export const state = {
  role: 'project-manager',
}
```

```js
// @file src/state/modules/dashboard/videos.js

export const state = {
  all: [],
}

export const getters = {
  favorited(state) {
    return state.all.filter((video) => video.favorited)
  },
}
```

Then you'd be able to access those modules with:

```js
store.state.dashboard.role
store.state.dashboard.videos.all
store.getters['dashboard/videos/favorited']
```

As you can see, placing the `videos` module in a folder called `dashboard` automatically nests it underneath the `dashboard` namespace. This works even if a `dashboard.js` file doesn't exist. You can also have as many levels of nesting as you want.
