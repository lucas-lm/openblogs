const app = require('./app')

const { NODE_ENV, PORT } = process.env

app.listen(PORT, () =>
  console.log(`Listen to port ${PORT} in ${NODE_ENV} mode`)
)
