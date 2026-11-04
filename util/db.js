require('dotenv').config()
const { Sequelize } = require('sequelize')

const databaseUrl =
  process.env.TESTING === 'true'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL

const sequelize = new Sequelize(databaseUrl, {
  logging: false,
})

module.exports = { sequelize }