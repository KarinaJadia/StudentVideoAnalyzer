import React from "react";
import "./Home.css"
import { Navbar, Nav, Container } from "react-bootstrap";


const Home = () => {
  return (
    <div id="home-page">

        <h1 id="home-title">Welcome to Husky Lecture Log</h1>

        <Navbar bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#videos">About HLL</Nav.Link>
                    <Nav.Link href="#upload">HLL History</Nav.Link>
                    <Nav.Link href="#about">Login</Nav.Link>
                    <Nav.Link href="#about">Admin</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    

        <section id="search">
            <h2>Learn from a new video!</h2>
            <input type="text" id="link-button" placeholder="Enter a video link!"></input>

            <form id="file-button">
                <label htmlFor="file-upload">Upload a file!</label>
                <input type="file" id="file-upload" />
            </form>

            <input type="text" id="cta-button" placeholder="Enter your question?"></input>    
        </section>
    </div>
  );
};

export default Home;