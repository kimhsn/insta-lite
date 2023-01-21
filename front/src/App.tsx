import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/UserProfile";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
