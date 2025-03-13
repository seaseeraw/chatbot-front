// import React, { useState } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { text: input, from: "user" }]);

//     try {
//       const { data } = await axios.post("http://localhost:5000/chat", { message: input });
//       setMessages((prev) => [...prev, { text: data.response, from: "bot" }]);
//     } catch (error) {
//       console.error("Error:", error);
//     }

//     setInput("");
//   };

//   return (
//     <div>
//       <h2>Chatbot</h2>
//       <div>
//         {messages.map((msg, i) => (
//           <p key={i} className={msg.from}>
//             {msg.text}
//           </p>
//         ))}
//       </div>
//       <input value={input} onChange={(e) => setInput(e.target.value)} />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState } from "react";
import "./App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.response };

      setMessages([...messages, userMessage, botMessage]);
      setInput("");
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">💬 AI Chatbot</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
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
