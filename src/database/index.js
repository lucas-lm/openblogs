const Sequelize = require('sequelize')

const dbConfig = {
  dialect: 'postgres',
  database: 'blogs',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  define: {
    timestamps: true,
    underscored: true,
  },
}

const conn = new Sequelize(dbConfig)

conn
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = conn
