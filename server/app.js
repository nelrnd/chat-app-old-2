const express = require("express")
const { createServer } = require("node:http")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
})

app.get("/", (req, res) => res.send("<h1>Hello World</h1>"))

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.broadcast.emit("chat message", "a new user connected")

  socket.on("chat message", (msg) => {
    console.log("message: " + msg)
    io.emit("chat message", msg)
  })

  socket.on("disconnect", () => {
    console.log("a user disconnected")
  })
})

io.on("connection", (socket) => {
  socket.on("join", (user) => {
    console.log("User joined: ", user)
    io.emit("join", user)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
