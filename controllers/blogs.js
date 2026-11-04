const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const tokenExtractor = require('../middleware/tokenExtractor')
const User = require('../models/user')
const { Op } = require('sequelize')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const where = {}

    if (req.query.search) {
  const pattern = `%${req.query.search}%`

  where[Op.or] = [
    { title: { [Op.iLike]: pattern } },
    { author: { [Op.iLike]: pattern } },
    ]
   }
    const blogs = await Blog.findAll({
      where,
      include: {
        model: User,
      },
    })

    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', tokenExtractor, async (req, res,next) => {
  try {
    const { author, url, title, likes } = req.body

    if (!url || !title) {
      return res.status(400).json({ error: 'title and url are required' })
    }

    const blog = await Blog.create({
      author,
      url,
      title,
      likes: likes ?? 0,
      userId: req.user.id
    })

    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    const { likes } = req.body

    if (!Number.isInteger(likes) || likes < 0) {
      return res.status(400).json({ error: 'likes must be a non-negative integer' })
    }

    blog.likes = likes
    await blog.save()

    res.json(blog)
  } catch (error) {
   next(error)
  }
})

blogsRouter.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }

    if (blog.userId !== req.user.id) {
      return res.status(403).json({ error: 'Only the blog owner can delete it' })
    }

    await blog.destroy()
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error: 'Could not delete blog' })
  }
})

module.exports = blogsRouter
