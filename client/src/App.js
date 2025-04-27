import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link,  } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    setIsLoggedIn(!!currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="navbar">
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="login-btn">
          {isLoggedIn ? (
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
