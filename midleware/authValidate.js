import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')

  if (!token) return res.status(401).send('unauthenticated')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified

    next()
  } catch (err) {
    res.status(400).send(`Error:${errr}`)
  }
}

module.exports = { verifyToken }