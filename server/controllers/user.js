const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils")

exports.user_register = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 12)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  await user.save()

  res.json({ message: "User created successfully" })
}

exports.user_login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user || bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(400).json({ error: "Invalid credentials " })
  }

  const token = generateToken(user)

  res.json({ message: "User logged in", token })
}

exports.user_is_auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  const valid = jwt.verify(token, process.env.JWT_SECRET)

  if (!valid) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  next()
}
