import React from "react";
import { useState } from "react";


import "./Home.css";

const Home = () => {
  const [videoLink, setVideoLink] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [question, setQuestion] = useState("");
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setVideoFile(file); 
    console.log(file);
  }

  const handleFileLink = (event) => {
    if (event.key === "Enter") {
      setVideoLink(event.target.value);
      console.log(event.target.value);
    }
  }

  const handleQuestion = (event) => {
    if (event.key === "Enter") {
      setQuestion(event.target.value);
      console.log(event.target.value);
    }
  }

  return (
    <div id="home-page">
      <section id="search">
        <h2 id="welcome">Learn from a new video!</h2>

        <div className="home-buttons">
          {/* upload card wrapper */}
          <div className="upload-card">
            <h4 className="upload-title">Provide a video to get started </h4>

            <div className="upload-row">
              <input
                type="text"
                className="link_box"
                placeholder="Enter a video link "
                onKeyDown={handleFileLink}
              />


              <form className="file-form">
                <input
                  type="file"
                  hidden
                  id="file-upload"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="custom-file-upload">
                  Upload Video File 
                </label>
              </form>
            </div>
          </div>

          {/* Ask Muffin section */}
          <div className="prompt-container">
            <h3 className="prompt-title">Ask Muffin </h3>
            <input
              type="text"
              className="prompt_box"
              placeholder="Ask Anything "
              onKeyDown={handleQuestion}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
