import Vue from 'vue'

// Globally register all base components, because they
// will be used very frequently.
const requireComponent = require.context('.', false, /_base-[\w-]+\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = require('lodash/upperFirst')(
    require('lodash/camelCase')(
      fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    )
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
