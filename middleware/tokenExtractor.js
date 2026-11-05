const jwt = require('jsonwebtoken')
const Session = require('../models/session')
const User = require('../models/user')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const token = authorization.substring(7)

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  try {
    const session = await Session.findOne({ where: { token } })

    if (!session || session.userId !== decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findByPk(session.userId)

    if (!user || user.disabled) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    req.user = user
    req.token = token
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = tokenExtractor