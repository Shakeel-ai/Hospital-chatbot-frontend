import React, { useState, useEffect, useRef } from "react";
import { marked } from "marked";
import "./ChatComponent.css";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  const generateThreadId = () => {
    const newId = crypto.randomUUID();
    localStorage.setItem("thread_id", newId);
    return newId;
  };

  const [threadId, setThreadId] = useState(() => {
    return localStorage.getItem("thread_id") || generateThreadId();
  });

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { sender: "You", text: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://hospital-chatbot-k4ne.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: userInput, thread_id: threadId }),
      });

      const data = await response.json();

      if (response.ok && data.bot_message?.messages) {
        const botMessages = data.bot_message.messages.filter(
          (msg) => msg.type === "ai" && msg.content.trim()
        );

        const latestBotMessage = botMessages.length > 0 ? botMessages[botMessages.length - 1] : null;

        if (latestBotMessage) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "Bot", text: latestBotMessage.content },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "Bot", text: "⚠️ Error: No valid response from the bot!" },
          ]);
        }
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Bot", text: "⚠️ Error: Unexpected response format!" },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: "⚠️ Request failed. Please try again." },
      ]);
    }

    setIsLoading(false);
  };

  const startNewThread = () => {
    const newId = generateThreadId();
    setThreadId(newId);
    setMessages([]); // Clear chat messages
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2 className="chat-header">💬 Hospital Chatbot</h2>
        <button className="new-thread-btn" onClick={startNewThread}>New Thread</button>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "You" ? "user-message" : "bot-message"}`}
            >
              <strong>{msg.sender}: </strong>
              <div dangerouslySetInnerHTML={{ __html: marked(msg.text || "") }} />
            </div>
          ))}
          {isLoading && (
            <div className="bot-message">
              <strong>Bot: </strong>
              <div className="spinner"></div>
            </div>
          )}
          <div ref={chatRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={isLoading}
          />
          <button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
