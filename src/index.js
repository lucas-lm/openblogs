const express = require('express')
const app = express()
const router = require('./routes')

require('./database')

const { NODE_ENV, PORT } = process.env

app.use(express.json())
app.use(router)

app.listen(8080, () =>
  console.log(`Listen to port ${PORT} in ${NODE_ENV} mode`)
)
