import React, { useState, useEffect } from "react";
import "./Login.css";
import { login } from "./apis";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in both username and password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(username, password);
      console.log("✅ Logged in user:", res);

      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }

    onLoginSuccess?.(res.user_id);
    } catch (err) {
      alert("Invalid username or password");
      console.error(" Login error:", err);
    } finally {
      setIsLoading(false);
    }
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
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
