const express = require('express')
require('./models/associations')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const errorHandler = require('./middleware/errorHandler')
const authorsRouter = require('./controllers/authors')

const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use(errorHandler)

module.exports = app