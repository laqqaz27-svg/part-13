const User = require('./user')
const Blog = require('./blog')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {
  through: Readinglist,
  as: 'readingList',
  foreignKey: 'userId',
  otherKey: 'blogId',
})

Blog.belongsToMany(User, {
  through: Readinglist,
  as: 'readingListUsers',
  foreignKey: 'blogId',
  otherKey: 'userId',
})

module.exports = { User, Blog, Readinglist }
