import Vue from 'vue'
import router from '@router'
import store from '@state/store'

// i imported the matirial component globali (instead of importing the whole libary)
// import { MdTable, MdContent } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.css'

// import VueMaterial from 'vue-material';
// import 'vue-material/dist/vue-material.min.css';

import App from './app.vue'

// Globally register all `_base`-prefixed components
import '@components/_globals'

// using and registering the matirial component globally

// Vue.component('MdTable',{ 'md-table' : MdTable })
// Vue.use(MdTable)
// Vue.use(MdContent)

// Vue.component('MdTable', { MdTable})
// Vue.component('MdContent', { MdContent})
// Vue.use(VueMaterial);

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Ensure tests fail when Vue emits an error.
  Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

// custom table title filter

Vue.filter('titleFilter', function(value) {
  return typeof value === typeof Number
    ? value
    : value
        .split('_')
        .join(' ')
        .toUpperCase()
})

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// If running e2e tests...
if (process.env.VUE_APP_TEST === 'e2e') {
  // Attach the app to the window, which can be useful
  // for manually setting state in Cypress commands
  // such as `cy.logIn()`.
  window.__app__ = app
}
