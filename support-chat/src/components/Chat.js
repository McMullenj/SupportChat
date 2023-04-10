// ChatInput.js
import React, { useState } from "react";

function ChatInput({ onSubmit }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && typeof onSubmit === "function") {
      onSubmit(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
