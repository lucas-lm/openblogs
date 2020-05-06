// TODO: transform this in a function
const fs = require('fs')
const path = require('path')

const places = fs.readdirSync(path.dirname(__filename))
const { name: here } = path.parse(path.basename(__filename))
const modules = {}
for (const place of places) {
  const { name } = path.parse(place)
  if (name !== here) {
    const Model = require(`./${name}`)
    const modelName = `${name[0].toLowerCase()}${name.slice(1)}Factory`
    modules[modelName] = (n) =>
      n && n > 0 ? [...Array(n)].map(() => new Model()) : new Model() // factories returns array with n models instace
    exports[modelName] = modules[name]
  }
}

module.exports = modules
