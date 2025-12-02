import React, { useEffect, useState } from "react";
import * as api from "./apis";
import "./Transcription.css";

export default function Transcription({ userId, chatId }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [chatIdState, setChatIdState] = useState(chatId);

  useEffect(() => {
    if (chatIdState) {
      api.viewVideo(chatIdState)
        .then((res) => {
          if (res.video_url) {
            console.log("Video URL:", res.video_url);
            setVideoUrl(res.video_url);
          }
        })
        .catch((err) => console.error("Failed to fetch video:", err));
    }
  }, [chatIdState]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const title = prompt("Enter a title for this lecture:");
    if (!title) {
      alert("Upload canceled — title is required.");
      return;
    }

    try {
      // upload, transcribe, and update transcript
      const newChatId = await api.uploadAndTranscribe(userId, title, file);

      console.log("Upload & transcription complete. Chat ID:", newChatId);
      setChatIdState(newChatId);

      // fetch the video URL after everything is done
      const chatData = await api.getChat(newChatId);
      if (chatData.video_url) {
        setVideoUrl(chatData.video_url);
      }

    } catch (err) {
      console.error("Upload and transcription failed:", err);
    }
  };

  return (
    <div className="transcription-full">
      <div className="transcription-box">
        <div className="transcription-header">
          <div className="inner">
            <h2>Lecture Transcript and Summary</h2>
            <p>Add a lecture video OR paste an existing transcript to get an AI-generated summary.</p>
          </div>
        </div>

        <div className="transcription-content">
          <div className="inner">
            {/* Video Display */}
            {videoUrl && (
              <div className="video-container">
                <video
                  src={videoUrl}
                  controls
                  style={{ width: "100%", maxHeight: "400px", marginBottom: "1rem" }}
                />
              </div>
            )}

            {/* Drag & Drop / Upload Box */}
            <div className="transcription-drag-drop">
              <h3>Drag & Drop your lecture video or transcript here</h3>
              <p>Accepted: MP4, MOV, TXT, PDF • Max 500MB</p>
              <div className="button-row">
                <form id="upload-button">
                  <input
                    type="file"
                    hidden
                    id="file-upload"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="upload">
                    Upload Video File📤
                  </label>
                </form>
                <button className="generate">Generate Summary</button>
              </div>
            </div>

            {/* AI Summary Box */}
            <div className="transcription-ai-summary">
              <h3>AI Summary</h3>
              <ul>
                <li>Bullet 1</li>
                <li>Bullet 2</li>
                <li>Bullet 3</li>
              </ul>
              <button className="download">Download</button>
            </div>

            {/* Ask Muffin Box */}
            <div className="transcription-ask-muffin">
              <h3>Ask Muffin</h3>
              <input type="text" placeholder="Ask Anything" />
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2025 Student Video Analyzer</p>
      </footer>
    </div>
  );
}