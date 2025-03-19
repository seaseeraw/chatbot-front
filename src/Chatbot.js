 



import React, { useState } from "react";
import "./App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to send a message
  const sendMessage = () => {
    if (input.trim() === "") return; // Prevent empty messages

    // Add user's message to chat
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput(""); // Clear input field

    // Show typing indicator for AI
    setIsTyping(true);

    setTimeout(() => {
      // Simulate AI response
      const aiResponse = getAIResponse(input);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", content: aiResponse },
      ]);
      setIsTyping(false);
    }, 1000); // Simulate AI delay
  };

  // Function to generate AI-like responses
  const getAIResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes("hello")) return "Hi there! How can I assist you?";
    if (lowerMsg.includes("how are you")) return "I'm just a chatbot, but I'm here to help!";
    if (lowerMsg.includes("help")) return "Sure! What do you need help with?";
    return "I'm not sure how to respond to that, but I'm learning!";
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      <div className="chat-header">
        💬 AI Chatbot
        <button className="dark-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">...</div>}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-send-btn">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
