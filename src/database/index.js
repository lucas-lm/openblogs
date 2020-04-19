const Sequelize = require('sequelize')
const dbConfig = require('./config')

const { NODE_ENV } = process.env

const conn = new Sequelize(dbConfig[NODE_ENV])

conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = conn
