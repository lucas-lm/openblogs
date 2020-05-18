const { Model } = require('sequelize')
const jwt = require('jsonwebtoken')
const schema = require('./schema')
const hooks = require('./hooks')

const { SECRET, JWT_LIFESPAN } = process.env

class User extends Model {
  static init(sequelize) {
    super.init(schema, { hooks, sequelize })
    return this
  }
}

User.associate = function (models) {
  this.hasMany(models.Article, { foreignKey: 'author_id', as: 'articles' })
}

User.prototype.generateToken = async function (lifespan = JWT_LIFESPAN) {
  const { id } = this
  console.log(JWT_LIFESPAN)
  const token = jwt.sign({ sub: id }, SECRET, { expiresIn: lifespan })
  return token
}

module.exports = User
