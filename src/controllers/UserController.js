const User = require('../models/User')

module.exports = {
  async create(req, res) {
    const { email, password } = req.body
    try {
      await User.create({ email, password })
      return res.sendStatus(201)
    } catch (error) {
      return res.status(400).json({ error })
    }
  },
}
