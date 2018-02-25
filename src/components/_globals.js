import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// Globally register all base components, because they
// will be used very frequently.
const requireComponent = require.context('.', false, /_base-[\w-]+\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
