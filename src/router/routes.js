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
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('auth/logOut')
      // Navigate back to previous page
      const authRequiredOnPreviousRoute = routeFrom.matched.some(
        route => route.meta.authRequired
      )
      next(authRequiredOnPreviousRoute ? next({ name: 'home' }) : routeFrom)
    },
  },
]
