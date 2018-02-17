/**
 * The file enables `@state/store.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */
import camelCase from 'lodash/camelCase'

const requireModule = require.context('.', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js' || /\.unit\.js$/.test(fileName)) return
  modules[camelCase(fileName.replace(/(\.\/|\.js)/g, ''))] = requireModule(
    fileName
  )
})

export default modules
