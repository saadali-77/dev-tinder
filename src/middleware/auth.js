const jwt = require('jsonwebtoken')
const User = require('../models/user')

const Auth = async (req, res, next) => {
  try {
    const { token } = req.cookies

    if (!token) {
      return res.status(401).json({ message: 'No token found' })
    }

    const decoded = jwt.verify(token, 'pb652343')
    const { _id } = decoded

    const user = await User.findById(_id)
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    req.user = user
    return next()
  } catch (err) {
    return res.status(401).json({ message: err.message })
  }
}

module.exports = { Auth }
