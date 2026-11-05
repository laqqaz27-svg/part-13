const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
 username: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
  validate: {
    notEmpty: true,
    isEmail: {
     msg: 'username must be a valid email address',
    }
  },
},

disabled: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
},

})

module.exports = User
