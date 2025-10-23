import React from "react";
import "./Home.css"
import { Navbar, Nav, Container } from "react-bootstrap";


const Home = () => {
  return (
    <div id="home-page">


        <h1>  </h1>
        <h1>  </h1>
    

        <section id="search">
            <text id="welcome">Learn from a new video!</text>
            <h1>  </h1>

            
            <input type="text" id="link-button" placeholder="Enter a video link!"></input>
            <h1>  </h1>

            <form id="file-button">
                <input type="file" hidden id ="file-upload" />
                <label for="file-upload" class="custom-file-upload">Upload a video File!</label>
            </form>

            <h1>  </h1>

            <input type="text" id="cta-button" placeholder="Enter your question?"></input>    
        </section>
    </div>
  );
};

export default Home;