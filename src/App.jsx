import { useState, useEffect } from 'react';
import './App.css';

import Login from './Login';
import About from './About';
import Admin from './Admin';
import FileExplorer from './FileExplorer';
import Home from './Home';
import Transcription from './transcription';
import ApiTester from "./ApiTester";
import { connectDB } from "./apis";

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    connectDB("studentanalyzer")
      .then(() => console.log("DB connected"))
      .catch((err) => console.error("DB connection failed:", err));
  }, []);

  const handleLoginSuccess = () => {
    setCurrentPage('Home');
  }

  // Function to render the current page
  const renderCurrentPage = () => {
    if (currentPage === 'login') {
      return (
        <div className="login-override">
          <Login onLoginSuccess={handleLoginSuccess}/>
        </div>
      );
    } else if (currentPage === 'Home') {
      return <Home setCurrentPage={setCurrentPage} />;
    } else if (currentPage === 'transcription') {
      return <Transcription setCurrentPage={setCurrentPage} />;
    } else if (currentPage === 'FileExplorer') {
      return <FileExplorer setCurrentPage={setCurrentPage} />;
    } else if (currentPage === 'About') {
      return <About setCurrentPage={setCurrentPage} />;
    } else if (currentPage === 'Admin') {
      return <Admin setCurrentPage={setCurrentPage} />;
    }else if (currentPage === 'API Tester') {
      return <ApiTester setCurrentPage={setCurrentPage} />;
    } else {
      return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      {/* Only show navbar if NOT login page */}
      {currentPage !== 'login' && (
        <nav className="navbar">
          <div className="nav-inner">
            <h3 className="logo">StudentVideoAnalyzer</h3>
            <ul className="nav-links">
              <li><a href="#" onClick={() => setCurrentPage('Home')}>Home</a></li>
              <li><a href="#" onClick={() => setCurrentPage('transcription')}>Transcription</a></li>
              <li><a href="#" onClick={() => setCurrentPage('FileExplorer')}>Files</a></li>
              <li><a href="#" onClick={() => setCurrentPage('About')}>About</a></li>
              <li><a href="#" onClick={() => setCurrentPage('API Tester')}>API Tester</a></li> {/* todo: delete */}
              <li><a href="#" onClick={() => setCurrentPage('login')}>Logout ➜]</a></li>
            </ul>
          </div>
        </nav>
      )}

      {/* Render the current page */}
      {renderCurrentPage()}
      
      {/* Only show footer if NOT login page */}
      {currentPage !== 'login' && currentPage !== 'transcription' && (
        <footer className="footer">
          <p>© 2025 Student Video Analyzer</p>
        </footer>
      )}
    </>
  )
}

export default App