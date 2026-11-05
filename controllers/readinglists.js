const readinglistsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Readinglist = require('../models/readinglist')
const tokenExtractor = require('../middleware/tokenExtractor')

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

readinglistsRouter.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const { read } = req.body

    if (typeof read !== 'boolean') {
      return res.status(400).json({ error: 'read must be a boolean' })
    }

    const reading = await Readinglist.findByPk(req.params.id)

    if (!reading) {
      return res.status(404).json({ error: 'Reading list entry not found' })
    }

    if (reading.userId !== req.user.id) {
      return res.status(401).json({
        error: 'You can only update your own reading list',
      })
    }

    reading.read = read
    await reading.save()

    res.json(reading)
  } catch (error) {
    next(error)
  }
})

module.exports = readinglistsRouter
