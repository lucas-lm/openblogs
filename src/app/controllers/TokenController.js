const { User } = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
  async create(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'password'],
    })
    if (user === null) return res.status(400).json({ error: 'Email not found' })
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect)
      return res.status(400).json({ error: 'Incorrect password' })
    const token = user.generateToken()
    return res.json({ token })
  },
}
