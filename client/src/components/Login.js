import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/sensorAPI";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(email, password);
      localStorage.setItem("currentUser", response.email);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueWithoutLogin = () => {
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <h1>Welcome Back</h1>
        <p>Access real-time air pollution data with your account.</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <button
            type="button"
            className="guest-btn"
            onClick={handleContinueWithoutLogin}
            disabled={isLoading}
          >
            Continue as Guest
          </button>
        </form>
        <p className="signup-link">
          New here? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
