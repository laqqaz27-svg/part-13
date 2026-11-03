const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
    })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.username = req.body.username
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
