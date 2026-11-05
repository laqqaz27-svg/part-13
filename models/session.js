const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const Session = sequelize.define('session', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = Session