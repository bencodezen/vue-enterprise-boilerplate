# State

## Helpers

The state helpers in `helpers.js` are the components' interface to the Vuex store. Depending on a component's concerns, we can import a subset of them these helpers to quickly bring in the data and actions we need.

You might be thinking, "Why not just automatically inject all of these into every component?" Well, then it could be difficult to figure out where a particular part of state is coming from. As our state becomes increasingly complex, the risk would also increase of accidentally using the same names for internal component state. This way, each component remains traceable, as the necessary `import` will provide a thread back to our helpers file if we ever don't understand where something is coming from.

## Modules

This is where the heavy lifting of most shared application state lives. Read more in the [Vuex modules](https://vuex.vuejs.org/en/modules.html) docs.
