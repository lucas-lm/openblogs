const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')
const User = require('./User')

class Article extends Model {}
// TODO: add new field for description
Article.init(
  {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Um artigo precisa ter um título!',
        },
      },
    },
    subtitle: DataTypes.STRING(100),
    content: DataTypes.TEXT,
    description: DataTypes.STRING(255),
  },
  { sequelize }
)

Article.belongsTo(User, { foreignKey: 'author_id', as: 'author' })
User.hasMany(Article, { foreignKey: 'author_id', as: 'articles' })

module.exports = Article
