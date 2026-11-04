const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const Blog = sequelize.define('blog', {
  author: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  year: {
  type: DataTypes.INTEGER,
  allowNull: true,
  validate: {
    validYear(value) {
      const currentYear = new Date().getFullYear()

      if (
        value !== null &&
        value !== undefined &&
        (!Number.isInteger(value) || value < 1991 || value > currentYear)
      ) {
        throw new Error(`year must be an integer from 1991 to ${currentYear}`)
      }
    },
  },
},

})

module.exports = Blog
