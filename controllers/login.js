const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const { SECRET } = require('../util/config')
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    })

    if (!user || req.body.password !== 'secret') {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    const token = jwt.sign(
      { username: user.username, id: user.id },
      SECRET
    )

    res.json({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter
