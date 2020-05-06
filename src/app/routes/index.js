const express = require('express')
// const allow = require('../middlewares/authorization')
const router = express.Router()

// Routes
const articles = require('./articles')

// Controllers
const UserController = require('../controllers/UserController')
const TokenController = require('../controllers/TokenController')

router.get('/', (req, res) => res.send('Welcome to openblogs api'))
router.post('/register', UserController.create)
router.post('/get_token', TokenController.create)
router.use('/articles', articles)

// show some results
router.get('/test', (req, res) => {
  return res.send(`Testando ${req}`)
})

module.exports = router
