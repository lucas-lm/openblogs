const { DataTypes } = require('sequelize')

module.exports = {
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
}
