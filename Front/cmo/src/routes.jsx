// src/routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import LocationPage from './pages/locationPage/LocationPage';
import ServicePage from './pages/servicePage/servicePage';
import DeliveryPage from './pages/deliveryPage/deliveryPage';
import RepairPage from './pages/repairPage/repairPage';
import Contact from './pages/contactPage/contactPage';
import LoginPage from './pages/loginPage/loginPage';
import TestPage from './pages/testPage/TestPage'; 
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/localizacao" element={<LocationPage />} />
      <Route path="/servicos" element={<ServicePage />} />
      <Route path="/busca-e-entrega" element={<DeliveryPage />} />
      <Route path="/conserto" element={<RepairPage />} />
      <Route path="/contato" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/test" element={<TestPage />} />

    </Routes>
  );
};

export default AppRoutes;
