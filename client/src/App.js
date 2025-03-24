import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login"; // Ensure Login.js exists in ./components

const App = () => {
  const [isLoggedIn] = useState(false); // Remove setIsLoggedIn if not used

  return (
    <Router>
      <div className="navbar">
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="login-btn">
          <Link to="/login">
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
  