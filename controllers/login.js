const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    })

    if (!user) {
      return res.status(401).json({ error: 'invalid username or password' })
    }

    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.SECRET
    )

    res.json({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter