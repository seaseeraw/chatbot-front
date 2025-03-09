import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, from: "user" }]);

    try {
      const { data } = await axios.post("http://localhost:5000/chat", { message: input });
      setMessages((prev) => [...prev, { text: data.response, from: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <div>
        {messages.map((msg, i) => (
          <p key={i} className={msg.from}>
            {msg.text}
          </p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
