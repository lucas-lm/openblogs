const app = require('./app')

const { NODE_ENV, PORT } = process.env

app.listen(PORT, () =>
  console.log(`Up and running at port ${PORT} in ${NODE_ENV} mode`)
)
