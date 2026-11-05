const logoutRouter = require('express').Router()
const tokenExtractor = require('../middleware/tokenExtractor')
const Session = require('../models/session')

logoutRouter.delete('/', tokenExtractor, async (req, res, next) => {
  try {
    await Session.destroy({
      where: { token: req.token },
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = logoutRouter