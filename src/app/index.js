const express = require('express')
const router = require('./routes')
const authentication = require('./middlewares/authentication')
require('../database')

const app = express()

app.use(express.json())
app.use(authentication)
app.use(router)

module.exports = app
