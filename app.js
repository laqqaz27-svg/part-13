const express = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const errorHandler = require('./middleware/errorHandler')
const loginRouter = require('./controllers/login')

const app = express()

app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)


module.exports = app