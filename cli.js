require('dotenv').config()
const { sequelize } = require('./util/db')
const Blog = require('./models/blog')

const main = async () => {
  try {
    const blogs = await Blog.findAll()
   blogs.forEach((blog) => {
  console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
})
  } catch (error) {
    console.error('Could not read blogs:', error.message)
    process.exitCode = 1
  } finally {
    await sequelize.close()
  }
}

main()
