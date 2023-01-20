import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Components/Home";
import Profile from "./Components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
