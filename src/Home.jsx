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
            <text id="welcome">Learn from a new video!</text>
            
            <input type="text" id="link-button" placeholder="Enter a video link!" />
            
            <form id="file-button">
                <input 
                  type="file" 
                  hidden 
                  id="file-upload" 
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload" className="custom-file-upload">
                  Upload a video File!
                </label>
            </form>

            <input type="text" id="cta-button" placeholder="Enter your question?" />  
        </section>
    </div>
  );
};

export default Home;