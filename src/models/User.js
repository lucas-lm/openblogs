const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../database')

const { SECRET } = process.env

class User extends Model {}

User.init(
  {
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
  },
  { sequelize }
)

User.beforeSave(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 12)
  user.password = hashedPassword
})

User.prototype.generateToken = function () {
  const id = this.id
  const token = jwt.sign({ aud: id }, SECRET)
  return token
}

module.exports = User
