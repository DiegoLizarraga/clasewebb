import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket'
import Channels from './components/Channels'
import Chat from './components/Chat'
import Users from './components/Users'

function App() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      console.log("✅ Conectado al servidor");
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log("❌ Desconectado del servidor");
      setIsConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Cleanup
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div className="app-container">
      <Channels onSelectChannel={setSelectedChannel} selectedChannel={selectedChannel} />
      <Chat selectedChannel={selectedChannel} />
      <Users />
      
      {/* Estado de conexión */}
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
      </div>
    </div>
  );
}

export default App;
