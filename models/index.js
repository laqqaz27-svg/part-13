const { sequelize } = require('../util/db')
require('./blog')
require('./user')

const main = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Database connected and models synchronized.')
  } catch (error) {
    console.error('Database setup failed:', error.message)
    process.exitCode = 1
  } finally {
    await sequelize.close()
  }
}

main()
