const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
      },
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Blog,
        as: 'readingList',
        attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
        through: {
          attributes: [],
        },
      },
    })

    if (!user) {
      return res.status(404).end()
    }

    const userData = user.toJSON()
    const readings = userData.readingList || []
    delete userData.readingList

    res.json({ ...userData, readings })
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

    user.name = req.body.name
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter