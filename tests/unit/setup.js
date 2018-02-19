import vueTestUtils from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.mixin({
  created() {
    this.$style = this.$style || {}
  },
})

global.mount = vueTestUtils.mount
global.mountShallow = vueTestUtils.shallow
global.mountShallowView = (Component, options = {}) => {
  return global.mountShallow(Component, {
    ...options,
    stubs: {
      Layout: {
        functional: true,
        render(h, { slots }) {
          return <div>{slots().default}</div>
        },
      },
      ...(options.stubs || {}),
    },
  })
}

global.createComponentMocks = ({ store, router, style, mocks, stubs }) => {
  const localVue = vueTestUtils.createLocalVue()
  const returnOptions = { localVue }
  returnOptions.stubs = mocks || {}
  returnOptions.mocks = stubs || {}

  if (store) {
    localVue.use(Vuex)
    returnOptions.store = new Vuex.Store({
      modules: Object.keys(store)
        .map(moduleName => {
          const storeModule = store[moduleName]
          return {
            [moduleName]: {
              state: storeModule.state || {},
              getters: storeModule.getters || {},
              actions: storeModule.actions || {},
              namespaced:
                typeof storeModule.namespaced === 'undefined'
                  ? true
                  : storeModule.namespaced,
            },
          }
        })
        .reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {}),
    })
  }

  if (router) {
    returnOptions.stubs['router-link'] = true
    returnOptions.stubs['router-view'] = true
  }

  if (style) {
    returnOptions.mocks.$style = style
  }

  return returnOptions
}
