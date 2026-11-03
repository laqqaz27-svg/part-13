const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const User = require('../models/user')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const decodedToken = jwt.verify(authorization.substring(7), SECRET)
    const user = await User.findByPk(decodedToken.id)

    if (!user) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'token missing or invalid' })
  }
}

module.exports = tokenExtractor
