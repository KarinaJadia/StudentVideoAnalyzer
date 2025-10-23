import React, { useState, useEffect } from "react";
import "./Login.css";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validUsers = [
    { email: "test@example.com", password: "password123" },
    { email: "student@uconn.edu", password: "husky123" },
    { email: "professor@uconn.edu", password: "teach2024" },
    { email: "admin@uconn.edu", password: "admin123" },
    { email: "user@demo.com", password: "demo123" },
    { email: "puppycat@cuteness.com", password: "puppycat1234" }
  ];

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const userExists = validUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (userExists) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        } 
        onLoginSuccess?.();
      } else {
        alert("Invalid email or password.");
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
