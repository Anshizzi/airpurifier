import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("currentUser", email);
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  const handleContinueWithoutLogin = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
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
        <button type="submit">Login</button>
        <button type="button" className="guest-btn" onClick={handleContinueWithoutLogin}>
          Continue Without Login
        </button>
      </form>
      <p>
        Need an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
