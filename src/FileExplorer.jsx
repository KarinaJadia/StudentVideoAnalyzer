import React, { useEffect, useState } from "react";
import * as api from "./apis";
import "./FileExplorer.css";

const FileExplorer = ({ setCurrentPage, userId, setCurrentChatId }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
  async function loadChats() {
    try {
      const res = await api.getUserChats(userId);
      // console.log("Raw data:", res);

      // convert backend fields to frontend fields
      const formatted = res.map(item => {

      // format date
      const date = item.created_date ? new Date(item.created_date) : null;
      const created = date
        ? date.toLocaleString(undefined, { 
            year: "numeric", 
            month: "2-digit", 
            day: "2-digit", 
            hour: "2-digit", 
            minute: "2-digit", 
            hour12: true 
          })
        : "N/A";

      return {
        id: item.chat_id,
        title: item.chat_title,
        created
      };
    });

      setChats(formatted);

    } catch (err) {
      console.error("Failed to load chats:", err);
    }
  }

  if (userId) loadChats();
}, [userId]);

  const handleChatClick = (chatId) => {
    // pass chatId to App state and switch page
    setCurrentChatId(chatId);
    setCurrentPage('transcription');
  };

  const handleBackClick = () => {
    // back button redirects to transcript page
    setCurrentPage('transcription');
  };

  return (
    <div className="chat-history-container">
      <h1 className="chat-title">Chat History</h1>

      <div className="chat-list">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className="chat-item"
            onClick={() => handleChatClick(chat.id)}
          >
            <span className="chat-name">{chat.title}</span>
            <span className="chat-date">Created: {chat.created}</span>
          </button>
        ))}
        <button className="back-button" onClick={() => handleBackClick()} >&lt; Back</button>
      </div>
    </div>
  );
};

export default FileExplorer;