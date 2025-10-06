import React, { useEffect, useState } from "react";
// import "./ChatHistory.css";

const ChatHistory = () => {
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

  return (
    <div className="chat-history-container">
      <button className="back-button">&lt; Back</button>
      <h1 className="chat-title">Chat History</h1>

      <div className="chat-list">
        {chats.map((chat) => (
          <div className="chat-item" key={chat.id}>
            <span className="chat-name">{chat.title}</span>
            <span className="chat-date">Last Accessed: {chat.lastAccessed}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;