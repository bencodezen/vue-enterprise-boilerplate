// Register each file as a corresponding Vuex module -- module nesting will
// mirror [sub-]directory hierarchy. (Modules are namespaced as the camelCase
// equivalent of their file name.)

import camelCase from 'lodash/camelCase'

const context = require.context('.', true, /\.js$/)
const root = { modules: {} }
const getNamespace = (subtree, path) => {
  if (path.length === 1) return subtree

  const namespace = path.shift()
  subtree.modules[namespace] = {
    modules: {},
    ...subtree.modules[namespace],
  }
  return getNamespace(subtree.modules[namespace], path)
}

context.keys().forEach(fileName => {
  let name = fileName.replace(/^\.\/|\.js$/g, '')
  if (/(^index|\.unit)$/.test(name)) return

  const path = name.split(/\//)
  const { modules } = getNamespace(root, path)

  name = path.pop()
  modules[camelCase(name)] = {
    namespaced: true,
    ...context(fileName),
  }
})

export default root.modules
