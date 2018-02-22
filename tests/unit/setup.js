// https://vue-test-utils.vuejs.org/en/
import vueTestUtils from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
_.mixin({ pascalCase: _.flow(_.camelCase, _.upperFirst) })

// Don't warn about not using the production build of Vue, as
// we care more about the quality of errors than performance.
Vue.config.productionTip = false

Vue.mixin({
  created() {
    // HACK: Set a fallback for the `$style` until vue-jest
    // includes better support for CSS modules.
    this.$style = this.$style || {}
  },
})

// Mock window properties not handled by JSDOM
Object.defineProperty(window, 'localStorage', {
  value: (function() {
    var store = {}

    return {
      getItem: function(key) {
        return store[key] || null
      },
      setItem: function(key, value) {
        store[key] = value.toString()
      },
      clear: function() {
        store = {}
      },
    }
  })(),
})

// ===
// Global helpers
// ===

const fs = require('fs')
const path = require('path')

const globalComponentFiles = fs
  .readdirSync(path.join(__dirname, '../../src/components'))
  .filter(fileName => /^_base-.+\.vue$/.test(fileName))

const globalComponentDeps = globalComponentFiles
  .map(fileName => ({
    [_.pascalCase(
      fileName.match(/^_(base-.+)\.vue$/)[1]
    )]: require('../../src/components/' + fileName).default,
  }))
  .reduce((optionA, optionB) => ({ ...optionA, ...optionB }), {})

global.mount = (Component, options = {}) => {
  Component = {
    ...Component,
    components: { ...globalComponentDeps, ...Component.components },
  }
  return vueTestUtils.mount(Component, options)
}

const globalComponentStubs = globalComponentFiles
  .map(fileName => ({
    [_.pascalCase(fileName.match(/^_(base-.+)\.vue$/)[1])]: true,
  }))
  .reduce((optionA, optionB) => ({ ...optionA, ...optionB }), {})

// Aliasing `shallow` to a more descriptive name
global.mountShallow = (Component, options = {}) => {
  options = { ...options, stubs: { ...globalComponentStubs, ...options.stubs } }
  return vueTestUtils.shallow(Component, options)
}

// A special version of `mountShallow` for view components
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

// A helper for creating Vue component mocks
global.createComponentMocks = ({ store, router, style, mocks, stubs }) => {
  // Use a local version of Vue, to avoid polluting the global
  // Vue and thereby affecting other tests.
  const localVue = vueTestUtils.createLocalVue()
  const returnOptions = { localVue }

  returnOptions.stubs = mocks || {}
  returnOptions.mocks = stubs || {}

  if (store) {
    localVue.use(Vuex)
    // Converts a `store` option shaped like:
    //
    // store: {
    //   someModuleName: {
    //     state: { ... },
    //     getters: { ... },
    //     actions: { ... },
    //   },
    //   anotherModuleName: {
    //     getters: { ... },
    //   },
    // },
    //
    // to a store instance, with each module namespaced by
    // default, just like in our app.
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

  // If using `router: true`, we'll automatically stub out
  // components from Vue Router.
  if (router) {
    returnOptions.stubs['router-link'] = true
    returnOptions.stubs['router-view'] = true
  }

  // If a `style` object is provided
  if (style) {
    returnOptions.mocks.$style = style
  }

  return returnOptions
}
