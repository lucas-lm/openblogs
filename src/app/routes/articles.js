const express = require('express')
const articles = express.Router()
const allow = require('../middlewares/authorization')

const ArticleController = require('../controllers/ArticleController')

articles.get('/', ArticleController.index)
articles.post('/', allow('authenticated'), ArticleController.create)

module.exports = articles
