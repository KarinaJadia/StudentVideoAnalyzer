import React from "react";
import "./Home.css"

const Home = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Handle the file
    }
  };

  return (
    <div id="home-page">
      <section id="search">
        <h2 id="welcome">Learn from a new video!</h2>
        <div className="home-buttons">
          <input type="text" id="link-button" placeholder="Enter a video link 🔗" />
          <input type="text" id="link-button" placeholder="Enter your question 🔍" />  

          <form id="file-button">
            <input type="file" hidden id="file-upload" onChange={handleFileUpload}/>
            <label htmlFor="file-upload" className="custom-file-upload">Upload Video File📤</label>
          </form>
        </div> 
      </section>
    </div>
  );
};

export default Home;