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
  socket.on("disconnect", () => {
    console.log("a user disconnected")
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
