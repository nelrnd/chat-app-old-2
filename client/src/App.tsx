import { useEffect, useState } from "react"
import { socket } from "./socket.ts"
import ConnectionState from "./components/ConnectionState.tsx"
import Events from "./components/Events.tsx"
import ConnectionManager from "./components/ConnectionManager.tsx"
import MyForm from "./components/MyForm.tsx"

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [fooEvents, setFooEvents] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onFooEvents(value) {
      setFooEvents((prev) => [...prev, value])
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("foo", onFooEvents)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("foo", onFooEvents)
    }
  }, [])

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  )
}

export default App
