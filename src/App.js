import React from 'react';
import './App.css';
import './index.css';
import MapInfoPage from './Components/MapInfoPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar.js';
import Login from './Components/Login.js';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MapInfoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
