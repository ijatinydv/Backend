import { useState, useRef, useEffect } from 'react'
import './App.css'
import { io } from "socket.io-client";
// import { response } from '../../backend/src/app';

function App() {
  const [Socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory])

  // Simulate bot response
  // const getBotResponse = (userMessage) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(`This is a response to: "${userMessage}"`)
  //     }, 1000)
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (message.trim() === '') return

    // Add user message
    const userMessage = {
      text: message,
      type: 'outgoing',
      timestamp: new Date().toLocaleTimeString()
    }
    
    setChatHistory(prev => [...prev, userMessage])

    Socket.emit('ai-message',message)


    setMessage('')


    // Get and add bot response
    // const botResponse = await getBotResponse(message)
    // const botMessage = {
    //   text: botResponse,
    //   type: 'incoming',
    //   timestamp: new Date().toLocaleTimeString()
    // }

    // setChatHistory(prev => [...prev, botMessage])
  }

  useEffect(()=>{
    let socketInstance = io("http://localhost:3000");
    setSocket(socketInstance)

    socketInstance.on('ai-message-response',(response)=>{

      const responseText = typeof response === 'object' ? JSON.stringify(response) : String(response);

      const botMessage = {
        // id: Date.now() + 1,
        text: responseText,
        type: 'incoming',
        timestamp: new Date().toLocaleTimeString(),
        // sender: 'bot'
      }

      setChatHistory(prev => [...prev, botMessage])

    })
  },[]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Assistant</h2>
      </div>
      
      <div className="chat-messages">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.type === 'outgoing' ? 'outgoing' : 'incoming'}`}
          >
            <div className="message-bubble">
              <div className="message-content">{msg.text}</div>
              <div className="message-timestamp">{msg.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="send-button" aria-label="Send">
          <span className="send-icon">→</span>
        </button>
      </form>
    </div>
  )
}

export default App
