const express = require('express')
const allow = require('../middlewares/authorization')
const router = express.Router()

const UserController = require('../controllers/UserController')
const TokenController = require('../controllers/TokenController')
const ArticleController = require('../controllers/ArticleController')

router.get('/', (req, res) => res.send('Welcome to openblogs api'))
router.post('/register', UserController.create)
router.post('/get_token', TokenController.create)
router.get('/articles', ArticleController.index)
router.post('/article', allow('authenticated'), ArticleController.create)

// show some results
router.get('/test', (req, res) => {
  const { auth } = req
  const a = auth ? '' : 'não'
  return res.send(`Você ${a} está autenticado`)
})

module.exports = router
