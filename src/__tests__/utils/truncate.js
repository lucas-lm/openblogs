const models = require('../../models')

module.exports = () =>
  Promise.all(
    Object.keys(models).map((key) => models[key].destroy({ truncate: true }))
  )
