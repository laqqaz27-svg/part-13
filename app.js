const express = require('express')
require('./models/associations')
const Blog = require('./models/blog')
const User = require('./models/user')
const Session = require('./models/session')
const Readinglist = require('./models/readinglist')
const { sequelize } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const errorHandler = require('./middleware/errorHandler')
const authorsRouter = require('./controllers/authors')
const readinglistsRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readinglistsRouter)
app.use('/api/logout', logoutRouter)

app.post('/api/reset', async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      await Session.destroy({ where: {}, transaction })
      await Readinglist.destroy({ where: {}, transaction })
      await Blog.destroy({ where: {}, transaction })
      await User.destroy({ where: {}, transaction })
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use(errorHandler)

module.exports = app