const Sequelize = require('sequelize')
const db = require('./config/config')

const { NODE_ENV } = process.env

const dbConfig = {
  ...db[NODE_ENV],
  define: {
    timestamps: true,
    underscored: true,
  },
}

const sequelize = new Sequelize(dbConfig)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
