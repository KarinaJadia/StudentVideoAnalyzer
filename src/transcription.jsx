import React, { useEffect, useState } from "react";
import * as api from "./apis";
import "./Transcription.css";

export default function Transcription({ userId, chatId }) {
  const [chatIdState, setChatIdState] = useState(chatId);
  const [videoUrl, setVideoUrl] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  // Update chatIdState if prop changes
  useEffect(() => {
    setChatIdState(chatId);
  }, [chatId]);

  // Fetch chat (video + transcript) whenever chatIdState changes
  useEffect(() => {
    if (!chatIdState) return;

    const fetchChat = async () => {
      setLoading(true);
      try {
        const chatData = await api.getChat(chatIdState);
        setVideoUrl(chatData.video_url || null);
        setTranscript(chatData.video_transcript || "");
      } catch (err) {
        console.error("Failed to fetch chat:", err);
        setVideoUrl(null);
        setTranscript("");
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, [chatIdState]);

  // Handle uploading a new video
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const title = prompt("Enter a title for this lecture:");
    if (!title) {
      alert("Upload canceled — title is required.");
      return;
    }

    try {
      // ipload and transcribe
      const newChatId = await api.uploadAndTranscribe(userId, title, file);
      setChatIdState(newChatId);

      // fetch the chat again to get updated video + transcript
      const chatData = await api.getChat(newChatId);
      setVideoUrl(chatData.video_url || null);
      setTranscript(chatData.video_transcript || "");
    } catch (err) {
      console.error("Upload and transcription failed:", err);
      alert("Failed to upload and transcribe video.");
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
              {loading ? (
                <p>Loading transcript...</p>
              ) : transcript ? (
                <p>{transcript}</p>
              ) : (
                <ul>
                  <li>Bullet 1</li>
                  <li>Bullet 2</li>
                  <li>Bullet 3</li>
                </ul>
              )}
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
