const readinglistsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Readinglist = require('../models/readinglist')

readinglistsRouter.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body

    if (!Number.isInteger(blogId) || !Number.isInteger(userId)) {
      return res.status(400).json({
        error: 'blogId and userId must be integers',
      })
    }

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const blog = await Blog.findByPk(blogId)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    const reading = await Readinglist.create({ userId, blogId })
    res.status(201).json(reading)
  } catch (error) {
    next(error)
  }
})

module.exports = readinglistsRouter
