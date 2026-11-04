require('dotenv').config()
const app = require('./app')
const { sequelize } = require('./util/db')

const PORT = process.env.PORT || 3001

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to start server:', error.message)
    process.exitCode = 1
  }
}

start()
