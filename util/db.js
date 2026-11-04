require('dotenv').config()
const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const databaseUrl =
  process.env.TESTING === 'true'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL

const sequelize = new Sequelize(databaseUrl, {
  logging: false,
  define: {
    underscored: true,
  },
})

const migrator = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({
    sequelize,
    tableName: 'migrations',
  }),
  context: sequelize.getQueryInterface(),
  logger: console,
})

const runMigrations = async () => {
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((migration) => migration.name),
  })
}

module.exports = { sequelize, runMigrations }
