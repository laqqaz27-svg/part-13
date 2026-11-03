const errorHandler = (error, req, res, next) => {
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    return res.status(400).json({
      error: error.errors.map((item) => item.message),
    })
  }

  console.error(error)
  res.status(500).json({ error: 'Internal server error' })
}

module.exports = errorHandler