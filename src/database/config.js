const path = require('path')

module.exports = {
  production: {
    dialect: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  development: {
    dialect: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  test: {
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../__tests__/tests_db.sqlite'),
  },
}
