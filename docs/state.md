# State management

- [Modules](#modules)
- [Helpers](#helpers)

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
