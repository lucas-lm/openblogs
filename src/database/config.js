const path = require('path')

module.exports = {
  production: {
    dialect: 'postgres',
    database: 'blogs',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  development: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'database.sqlite'),
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory',
  },
}
