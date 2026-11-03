require('dotenv').config()
const { sequelize } = require('./util/db')
const Blog = require('./models/blog')

const main = async () => {
  try {
    const blogs = await Blog.findAll()
    console.table(blogs.map(blog => blog.toJSON()))
  } catch (error) {
    console.error('Could not read blogs:', error.message)
    process.exitCode = 1
  } finally {
    await sequelize.close()
  }
}

main()
