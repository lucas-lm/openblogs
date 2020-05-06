const models = require('../../app/models')

module.exports = () =>
  Promise.all(
    Object.keys(models).map((key) => models[key].destroy({ truncate: true }))
  )
