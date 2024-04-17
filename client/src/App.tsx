import { useEffect, useState } from "react"
import { socket } from "./socket"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./routes/Login"
import Register from "./routes/Register"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
/*
export default function App() {
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    if (!value) return
    socket.timeout(5000).emit("chat message", value, () => setIsLoading(false))
    setValue("")
  }

  useEffect(() => {
    function onChatMessage(msg) {
      setMessages((prev) => [...prev, msg])
    }

    socket.on("chat message", onChatMessage)

    return () => {
      socket.off("chat message", onChatMessage)
    }
  }, [])

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input placeholder="Type in something..." value={value} onChange={(e) => setValue(e.target.value)} />
        <button disabled={isLoading}>{isLoading ? "Loading..." : "Submit"}</button>
      </form>
    </div>
  )
}

export default function App() {
  const [username, setUsername] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    function onConnect() {
      socket.emit("join", username)
    }

    function onChatMessage(msg) {
      setMessages((prev) => [...prev, msg])
    }

    socket.on("connect", onConnect)
    socket.on("chat message", onChatMessage)

    return () => {
      socket.off("connect", onConnect)
      socket.off("chat message", onChatMessage)
    }
  }, [username])

  if (!username) {
    return <EntryForm setUsername={setUsername} />
  }

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <ChatMessages messages={messages} />
      <ChatInput />
    </div>
  )
}

function EntryForm({ setUsername }) {
  const [value, setValue] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    if (!value) return
    setUsername(value)
    socket.connect()
  }

  return (
    <form onSubmit={handleSubmit} className="space-x-2">
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Pick a username" />
      <button className="text-white bg-blue-600 px-3 py-2">Enter chat</button>
    </form>
  )
}

function ChatMessages({ messages }) {
  return (
    <ul className="flex-1 space-y-2">
      {messages.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}
    </ul>
  )
}

function ChatInput() {
  const [value, setValue] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    if (!value) return
    socket.emit("chat message", value)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type in something..."
        className="flex-1"
      />
      <button className="text-white bg-blue-600 px-3 py-2">Submit</button>
    </form>
  )
}

function OnlineUsers({ users }) {
  return (
    <aside>
      <h3>Online users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </aside>
  )
}


*/
