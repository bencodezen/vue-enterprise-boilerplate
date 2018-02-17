import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import routes from './routes'
import store from '@state/store'

Vue.use(VueRouter)
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page',
})

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes)
  const authRequired = routeTo.matched.some(route => route.meta.authRequired)

  if (!authRequired || store.getters.loggedIn) {
    // Just continue to the route
    return next()
  } else {
    // Redirect to the login page
    next({ name: 'login' })
  }
})

export default router
