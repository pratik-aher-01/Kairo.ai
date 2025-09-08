import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setChat([...chat, userMessage]);

    // Call your backend
    const res = await fetch("https://your-backend.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setChat([...chat, userMessage, { role: "bot", content: data.reply }]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Chatbot</h1>
      <div style={{ border: "1px solid #ccc", padding: 10, minHeight: 300 }}>
        {chat.map((msg, i) => (
          <p key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
            <b>{msg.role === "user" ? "You" : "Bot"}: </b>{msg.content}
          </p>
        ))}
      </div>
      <input
        style={{ width: "80%", padding: 10 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} style={{ padding: 10 }}>Send</button>
    </div>
  );
}

export default App;
