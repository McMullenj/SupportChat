// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatInput from "./components/Chat";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hello! How are you feeling today?",
    },
  ]);

  const [waitingForApiResponse, setWaitingForApiResponse] = useState(false);

  const addMessage = (content, isUser) => {
    const role = isUser ? "user" : "assistant";
    setMessages((prevMessages) => [...prevMessages, { role, content }]);
  };

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 4000);
  }, []);

  const handleMessageSubmit = async (message) => {
    addMessage(message, true);
    console.log("Sending message...");
    setWaitingForApiResponse(true);
    const response = await sendMessageToGPT(message);
    setWaitingForApiResponse(false);
    if (response) {
      addMessage(response, false);
    }
  };

  function truncateResponse(response, maxLength) {
    if (response.length <= maxLength) {
      return response;
    }

    const lastSpaceIndex = Math.max(
      response.lastIndexOf(".", maxLength),
      response.lastIndexOf("?", maxLength),
      response.lastIndexOf("!", maxLength)
    );
    return response.slice(0, lastSpaceIndex + 1);
  }

  const sendMessageToGPT = async (message) => {
    try {
      const response = await axios.post("/api/gpt3", {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a chatbot targeted at supporting individuals that are struggling with a mental illness. You must be as understanding as possible and prompt good therapeutic practices in the conversation. Have a conversational approach rather than trying to solve their problems.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 80,
      });
      const rawResponse = response.data.choices[0].message.content.trim();
      const truncatedResponse = truncateResponse(rawResponse, 100000); // Set the maximum allowed character count here
      return truncatedResponse;
    } catch (error) {
      console.error("Error sending message. Please try again later...", error);
      return "Error: Unable to connect to GPT-3 API";
    }
  };

  return (
    <div className="App">
      {showSplash && (
        <div className="splash-screen">
          <div className="splash-logo">
            <h1>Support Chat</h1>
            <p>Here for you, whenever you need</p>
          </div>
        </div>
      )}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-message" : "gpt-message"}
          >
            <div
              className={`message-content ${
                msg.role === "user" ? "user" : "gpt"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {waitingForApiResponse && (
          <div className="waiting-bubble">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
      </div>
      <ChatInput onSubmit={handleMessageSubmit} />
    </div>
  );
}

export default App;
