// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homePage/homePage';
import LocationPage from './pages/locationPage/LocationPage';
import PhotoPage from './pages/photoPage/photoPage';
import DeliveryPage from './pages/deliveryPage/deliveryPage';
import RepairPage from './pages/repairPage/repairPage';
import Contact from './pages/contactPage/contactPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/localizacao" element={<LocationPage />} />
          <Route path="/fotos" element={<PhotoPage />} />
          <Route path="/busca-e-entrega" element={<DeliveryPage />} />
          <Route path="/conserto" element={<RepairPage />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
