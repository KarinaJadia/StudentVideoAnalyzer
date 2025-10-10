import React from "react";
import "./Home.css"
import { Navbar, Nav, Container } from "react-bootstrap";


const Home = () => {
  return (
    <div id="home-page">

        <h1 id="home-title">Husky Lecture Log</h1>

        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="custom-navbar">
            <Container>
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#videos">About HLL</Nav.Link>
                        <Nav.Link href="#upload">HLL History</Nav.Link>
                        <Nav.Link href="#about">Login</Nav.Link>
                        <Nav.Link href="#about">Admin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

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