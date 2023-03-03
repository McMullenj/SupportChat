import React, { useState } from "react";
import "./Chat.css";
import openai from "openai";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form
        className="chat-form"
        onSubmit={(event) => {
          openai.apiKey = "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";
          openai.ChatCompletion.Create({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful chat bot" },
              { role: "user", content: "Hi i would like to talk" },
            ],
            prompt: text,
            max_tokens: 32,
            n: 1,
            stop: ".",
            temperature: 0.5,
          }).then((response) => {
            const message = response.data.choices[0].text;
            addMessage(message);
          });
          event.preventDefault();
          const input = event.target.elements.message;
          const text = input.value;
          input.value = "";
          // Send the message to the GPT-3 model and add the response to the chat
          // Add your code here…
        }}
      >
        <input type="text" placeholder="Enter your message" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
