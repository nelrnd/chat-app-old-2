import { useEffect, useState } from "react"
import { socket } from "./socket"

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
