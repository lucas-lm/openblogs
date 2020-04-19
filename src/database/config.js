module.exports = {
  production: {
    dialect: 'postgres',
    database: 'blogs',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  development: {
    dialect: 'sqlite',
    storage: './src/database/database.sqlite3',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
}
