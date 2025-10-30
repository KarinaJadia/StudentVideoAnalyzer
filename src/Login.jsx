import React, { useState, useEffect } from "react";
import "./Login.css";

export default function Login({ onLoginSuccess }) {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validUsers = [
    { username: "test", password: "password123" },
    { username: "student", password: "husky123" },
    { username: "professor", password: "teach2024" },
    { username: "admin", password: "admin123" },
    { username: "user", password: "demo123" },
    { username: "puppycat", password: "puppycat1234" }
  ];

  useEffect(() => {
    const savedusername = localStorage.getItem("rememberedusername");
    if (savedusername) {
      setusername(savedusername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in both username and password");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const userExists = validUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (userExists) {
        if (rememberMe) {
          localStorage.setItem("rememberedusername", username);
        } else {
          localStorage.removeItem("rememberedusername");
        } 
        onLoginSuccess?.();
      } else {
        alert("Invalid username or password.");
      }

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-full">
      <div className="login-box">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to Continue</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="username"
              placeholder="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="remember-row">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
            />
            <label htmlFor="remember">Remember Me</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
        </div>
      </div>
    </div>
  );
}
