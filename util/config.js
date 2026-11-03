const SECRET = process.env.SECRET

if (!SECRET) {
  throw new Error('SECRET is missing from .env')
}

module.exports = { SECRET }
