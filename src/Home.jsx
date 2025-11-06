import React from "react";
import "./Home.css";

const Home = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Handle the file
    }
  };

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
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
