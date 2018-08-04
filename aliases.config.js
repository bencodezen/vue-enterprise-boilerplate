const path = require('path')
const jsconfig = require('./jsconfig.json')

function resolveSrc(_path) {
  return path.join(__dirname, _path)
}

/**
 * In jsconfig.json, the aliases are stored in arrays.
 * convert aliases into the expected format: {[alias:string]:string}
 *
 * @example `{"@src/*": ["src/*"]} will be converted to {"@src": "src"}
 * @param {[alias:string]: Array<string>} aliasesArrays
 * @returns Converted aliases
 */
function resolveJsConfig(aliasesArrays) {
  const simplifiedAliases = {}
  const slashStarRE = /\/\*$/g
  for (let alias in aliasesArrays) {
    const aliasTmp = alias.replace(slashStarRE, '')
    const pathTmp = aliasesArrays[alias][0].replace(slashStarRE, '')
    simplifiedAliases[aliasTmp] = pathTmp
  }
  return simplifiedAliases
}

const aliases = resolveJsConfig(jsconfig.compilerOptions.paths)

module.exports = {
  webpack: {},
  jest: {},
}

for (const alias in aliases) {
  module.exports.webpack[alias] = resolveSrc(aliases[alias])
  module.exports.jest['^' + alias + '/(.*)$'] =
    '<rootDir>/' + aliases[alias] + '/$1'
}
