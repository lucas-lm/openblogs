const express = require('express')
const router = require('./routes')
const authentication = require('./middlewares/authentication')
const app = express()

require('./database')

app.use(express.json())
app.use(authentication)
app.use(router)

module.exports = app
