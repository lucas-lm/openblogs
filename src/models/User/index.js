const { Model } = require('sequelize')
const jwt = require('jsonwebtoken')
const schema = require('./schema')
const hooks = require('./hooks')

const { SECRET, JWT_TIMESPAN } = process.env

class User extends Model {
  static init(sequelize) {
    super.init(schema, { hooks, sequelize })
    return this
  }
}

User.associate = function (models) {
  this.hasMany(models.Article, { foreignKey: 'author_id', as: 'articles' })
}

User.prototype.generateToken = function () {
  const { id } = this
  const token = jwt.sign({ sub: id }, SECRET, { expiresIn: JWT_TIMESPAN })
  return token
}

module.exports = User
