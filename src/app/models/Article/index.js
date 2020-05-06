const { Model } = require('sequelize')
const schema = require('./schema')

class Article extends Model {
  static init(conn) {
    super.init(schema, { sequelize: conn })
    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'author_id', as: 'author' })
  }
}

module.exports = Article
