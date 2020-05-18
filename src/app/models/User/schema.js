const { DataTypes } = require('sequelize')

module.exports = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Email inválido',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 255],
        msg: 'Password must be between 6 and 255 characters',
      },
    },
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}
