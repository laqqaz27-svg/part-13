require('dotenv').config()
const { sequelize } = require('../util/db')
require('./associations')

const main = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log('Database connected and models synchronized.')
  } catch (error) {
    console.error('Database setup failed:', error.message)
    process.exitCode = 1
  } finally {
    await sequelize.close()
  }
}

main()
