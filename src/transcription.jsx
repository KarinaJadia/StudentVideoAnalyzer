import React from "react";
import "./Transcription.css";

export default function Transcription() {
  return (
    <div className="transcription-full">
      
      {/* Navbar */}
      <nav className="navbar">
        <h3>NAVBAR</h3>
      </nav>

      <div className="transcription-box">
        {/* Gradient Header */}
        <div className="transcription-header">
          <div className="inner">
            <h2>Lecture Transcript and Summary</h2>
            <p>
              Add a lecture video OR paste an existing transcript to get an
              AI-generated summary.
            </p>
          </div>
        </div>

        {/* White Body */}
        <div className="transcription-content">
          <div className="inner">
            {/* Drag & Drop Box */}
            <div className="transcription-drag-drop">
              <h3>Drag & Drop your lecture video or transcript here</h3>
              <p>Accepted: MP4, MOV, TXT, PDF • Max 500MB</p>
              <div className="button-row">
                <button className="upload">Upload File</button>
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

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Student Video Analyzer</p>
      </footer>
    </div>
  );
}