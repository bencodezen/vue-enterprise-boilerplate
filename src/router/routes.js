import store from '@state/store'

export default [
  {
    path: '/',
    name: 'home',
    component: require('@views/home').default,
  },
  {
    path: '/login',
    name: 'login',
    component: require('@views/login').default,
    beforeEnter(routeTo, routeFrom, next) {
      // If the user is already logged in
      if (store.getters['auth/loggedIn']) {
        // Redirect to the home page instead
        next({ name: 'home' })
      } else {
        // Continue to the login page
        next()
      }
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: require('@views/profile').default,
    meta: {
      authRequired: true,
    },
    props: route => ({ user: store.state.auth.currentUser }),
  },
  {
    path: '/profile/:username',
    name: 'username-profile',
    component: require('@views/profile').default,
    meta: {
      authRequired: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store
        // Try to fetch the user's information by their username
        .dispatch('users/fetchUser', { username: routeTo.params.username })
        .then(user => {
          // Add the user to the route params, so that it can
          // be provided as a prop for the view component below.
          routeTo.params.user = user
          // Continue to the route.
          next()
        })
        .catch(() => {
          // If a user with the provided username could not be
          // found, redirect to the 404 page.
          next({ name: '404', params: { resource: 'User' } })
        })
    },
    // Set the user from the route params, once it's set in the
    // beforeEnter route guard.
    props: route => ({ user: route.params.user }),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('auth/logOut')
      const authRequiredOnPreviousRoute = routeFrom.matched.some(
        route => route.meta.authRequired
      )
      // Navigate back to previous page, or home as a fallback
      next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom })
    },
  },
  {
    path: '/404',
    name: '404',
    component: require('@views/404').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true,
  },
  // Redirect any unmatched routes to the 404 page. This may
  // require some server configuration to work in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  {
    path: '*',
    redirect: '404',
  },
]
