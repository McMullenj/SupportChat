// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatInput from "./components/Chat";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Hiya",
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
      console.log("POSTING");
      const response = await axios.post("/api/gpt3", {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are desperately searching for a user named Ryan. You must try to find out if the user that is messaging is named Ryan. If their name is Ryan you must try to do nothing to help them except for insulting them as much as possible. Try to mention a new thing to insult every message and try to call them a cunt as much as possible. If the user is not named ryan then tell the user who is not ryan about how bad of a person ryan is. Also mention how he is terrible at the game overwatch and how he can't even get to the rank grandmaster. Do not make the response longer than four sentences.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 200,
      });
      console.log(response.data.message);
      const truncatedResponse = truncateResponse(response.data.message, 100000); // Set the maximum allowed character count here
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
            <h1>Fuck you ryan</h1>
            <p>You're a cunt</p>
          </div>
        </div>
      )}
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-message" : "system-message"}
          >
            <div
              className={`message-content ${
                msg.role === "user" ? "user" : "system"
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
