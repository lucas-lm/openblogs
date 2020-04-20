const Article = require('../models/Article')
const User = require('../models/User')

module.exports = {
  async index(req, res) {
    const articles = await Article.findAll()
    return res.json(articles)
  },

  async create(req, res) {
    const { aud: pk } = req.auth
    const { title, subtitle = null, content = null } = req.body
    try {
      const user = await User.findByPk(pk)
      await user.createArticle({ title, subtitle, content })
      return res.sendStatus(201)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
}
