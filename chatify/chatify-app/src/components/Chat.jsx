import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = ({ selectedChannel }) => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Alex', message: '¡Hola a todos!', timestamp: '10:30' },
    { id: 2, user: 'Jordan', message: 'Hey! ¿Cómo están?', timestamp: '10:31' },
    { id: 3, user: 'Alex', message: 'Muy bien, trabajando en el proyecto', timestamp: '10:32' },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        message: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{selectedChannel?.name || '#general'}</h2>
        <p>Canal de comunicación</p>
      </div>

      <div className="messages-area">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <div className="message-user">
              <span className="user-name">{msg.user}</span>
              <span className="message-time">{msg.timestamp}</span>
            </div>
            <p className="message-content">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder={`Escribe algo en ${selectedChannel?.name || '#general'}...`}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-btn">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
