// TODO: transform this in a function
const fs = require('fs')
const path = require('path')

const places = fs.readdirSync(path.dirname(__filename))
const { name: here } = path.parse(path.basename(__filename))
const modules = {}
for (const place of places) {
  const { name } = path.parse(place)
  if (name !== here) {
    modules[name] = require(`./${name}`)
    exports[name] = modules[name]
  }
}

module.exports = modules
