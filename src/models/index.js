const fs = require('fs')
const path = require('path')

const places = fs.readdirSync(path.dirname(__filename))
const { name: here } = path.parse(path.basename(__filename))
const models = {}

for (const place of places) {
  const { name } = path.parse(place)
  if (name !== here) {
    const model = require(`./${name}`)
    models[name] = model
    exports[name] = model
  }
}

module.exports = models
