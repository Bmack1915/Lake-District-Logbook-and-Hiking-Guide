import React from "react";
import "./App.css";
import "./index.css";
import MapInfoPage from "./Components/MapInfoPage.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MapInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
