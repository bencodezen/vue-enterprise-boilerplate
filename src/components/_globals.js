import Vue from 'vue'

// Globally register all "app-" prefixed components, as they
// will be used very frequently.
const requireComponent = require.context('.', false, /app-[\w-]+\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = require('lodash/upperFirst')(
    require('lodash/camelCase')(
      fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
    )
  )
  Vue.component(componentName, componentConfig.default || componentConfig)
})
