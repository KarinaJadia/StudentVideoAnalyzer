import React, { useEffect, useState } from "react";
import * as api from "./apis";
import "./FileExplorer.css";

const FileExplorer = ({setCurrentPage, userId}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // fake db stuff
    const data = [
      { id: 1, title: "Biology Lecture 3", lastAccessed: "2 hrs" },
      { id: 2, title: "History of Armadillos", lastAccessed: "8 hrs" },
      { id: 3, title: "Biology Lecture 1", lastAccessed: "1 day ago" },
      { id: 4, title: "How to Cook Lasagna", lastAccessed: "9/2/2025" },
      { id: 5, title: "Intro to Biology", lastAccessed: "8/29/2025" },
      { id: 6, title: "What to pack for college", lastAccessed: "8/29/2025" },
      { id: 7, title: "Apple vs Samsung", lastAccessed: "8/4/2025" },
      { id: 8, title: "Victorious Video Essay", lastAccessed: "8/1/2025" },
    ];
    setChats(data);
  }, []);

  const handleChatClick = (chatId) => {
    // redirect to a specific chat page
    navigate(`/chat/${chatId}`);
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
            <span className="chat-date">Last Accessed: {chat.lastAccessed}</span>
          </button>
        ))}
        <button className="back-button" onClick={() => handleBackClick()} >&lt; Back</button>
      </div>
    </div>
  );
};

export default FileExplorer;