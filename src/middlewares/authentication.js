const jwt = require('jsonwebtoken')
const { SECRET } = process.env // TODO: create function to extract secret to publish this like a package

module.exports = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    req.auth = false
    return next()
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const payload = jwt.verify(token, SECRET)
    req.auth = payload
    return next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
