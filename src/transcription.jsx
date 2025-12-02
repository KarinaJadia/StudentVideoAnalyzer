import React, { useEffect, useState } from "react";
import * as api from "./apis";
import "./Transcription.css";

export default function Transcription({ userId, chatId }) {
  const [chatIdState, setChatIdState] = useState(chatId);
  const [videoUrl, setVideoUrl] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [muffinQuestion, setMuffinQuestion] = useState("");
  const [muffinAnswer, setMuffinAnswer] = useState("");
  const [loadingMuffin, setLoadingMuffin] = useState(false);

  useEffect(() => {
    setChatIdState(chatId);
  }, [chatId]);

  // Fetch chat (video + transcript) whenever chatIdState changes
  useEffect(() => {
    if (!chatIdState) return;

    const fetchChat = async () => {
      setLoadingTranscript(true);
      try {
        const chatData = await api.getChat(chatIdState);
        setVideoUrl(chatData.video_url || null);
        setTranscript(chatData.video_transcript || "");
        setSummary(""); // clear previous summary
      } catch (err) {
        console.error("Failed to fetch chat:", err);
        setVideoUrl(null);
        setTranscript("");
      } finally {
        setLoadingTranscript(false);
      }
    };

    fetchChat();
  }, [chatIdState]);

  const generateSummary = async () => {
    if (!transcript) {
      alert("Transcript is empty!");
      return;
    }
    setLoadingSummary(true);
    try {
      const res = await api.askGemini(`Please summarize the following transcript:\n\n${transcript}`);
      setSummary(res.answer || "No summary returned.");
    } catch (err) {
      console.error("Failed to generate summary:", err);
      alert("Failed to generate summary.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const title = prompt("Enter a title for this lecture:");
    if (!title) {
      alert("Upload canceled — title is required.");
      return;
    }

    try {
      const newChatId = await api.uploadAndTranscribe(userId, title, file);
      setChatIdState(newChatId);

      const chatData = await api.getChat(newChatId);
      setVideoUrl(chatData.video_url || null);
      setTranscript(chatData.video_transcript || "");
      setSummary(""); // clear previous summary
    } catch (err) {
      console.error("Upload and transcription failed:", err);
      alert("Failed to upload and transcribe video.");
    }
  };

  const askMuffin = async () => {
    if (!muffinQuestion) return;
    setLoadingMuffin(true);
    try {
      // append transcript for context
      const prompt = transcript
        ? `${muffinQuestion}\n\nTranscript Context:\n${transcript}`
        : muffinQuestion;

      const res = await api.askGemini(prompt);
      setMuffinAnswer(res.answer || "No answer returned.");
    } catch (err) {
      console.error("Failed to ask Muffin:", err);
      alert("Failed to get answer from Muffin.");
    } finally {
      setLoadingMuffin(false);
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
                <button className="generate" onClick={generateSummary}>
                  Generate AI Summary
                </button>
              </div>
            </div>

            {/* Transcript Box */}
            <div className="transcription-box-section">
              <h3>Transcript</h3>
              {loadingTranscript ? (
                <p>Loading transcript...</p>
              ) : (
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={10}
                  style={{ width: "100%" }}
                />
              )}
            </div>

            {/* AI Summary Box */}
            <div className="transcription-ai-summary">
              <h3>AI Summary</h3>
              {loadingSummary ? (
                <p>Generating summary...</p>
              ) : summary ? (
                <p>{summary}</p>
              ) : (
                <p>No summary generated yet. Click "Generate AI Summary" to create one.</p>
              )}
            </div>

            {/* Ask Muffin Box */}
            <div className="transcription-ask-muffin">
              <h3>Ask Muffin</h3>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="Ask Anything"
                  value={muffinQuestion}
                  onChange={(e) => setMuffinQuestion(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={askMuffin}>Ask</button>
              </div>
              {loadingMuffin && <p>Thinking...</p>}
              {muffinAnswer && <p><strong>Muffin:</strong> {muffinAnswer}</p>}
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
