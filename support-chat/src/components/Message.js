// Message.js
import React from "react";

function Message({ message, isUser }) {
  return (
    <div className={`message ${isUser ? "user-message" : "gpt-message"}`}>
      <div className={`message-content ${isUser ? "user" : "gpt"}`}>
        {message}
      </div>
    </div>
  );
}

export default Message;
