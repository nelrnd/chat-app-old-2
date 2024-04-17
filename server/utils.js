const jwt = require("jsonwebtoken")

export function generateToken(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET)

  return token
}
