const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const { SECRET, SENDGRID_API_KEY, SENDGRID_TEMPLATE_ID_WELCOME } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const msg = (token, email) => ({
  to: email,
  from: 'noreply@openblogsapi.com',
  templateId: SENDGRID_TEMPLATE_ID_WELCOME,
  dynamic_template_data: {
    token,
  },
})

module.exports = {
  async create(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.create({ email, password, active: false })
      const token = await user.generateToken()
      await sgMail.send(msg(token, email))
      return res.sendStatus(201)
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error })
    }
  },

  async activate(req, res) {
    const { token } = req.params
    console.log(token)
    if (!token) return res.status(400).json({ error: 'token must be provided' })
    try {
      const { sub: userId } = jwt.verify(token, SECRET)
      const user = await User.findByPk(userId)
      if (!user) return res.status(400).json({ error: 'invalid token' })
      if (user.active)
        return res.status(400).json({ error: 'this account is already active' })
      user.active = true
      await user.save()
      return res.redirect(204, '/')
    } catch (error) {
      console.error(error)
      return res.status(400).json({ error })
    }
  },
}
