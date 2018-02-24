// Register all Vuex module by a camelCase version of their filename.

import camelCase from 'lodash/camelCase'

const requireModule = require.context('.', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js' || /\.unit\.js$/.test(fileName)) return
  modules[camelCase(fileName.replace(/(\.\/|\.js)/g, ''))] = {
    namespaced: true,
    ...requireModule(fileName),
  }
})

export default modules
