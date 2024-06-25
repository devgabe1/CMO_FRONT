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

import ServicoRead from './components/adm/servicos/ServicoRead';
import ServicoCreate from './components/adm/servicos/ServicoCreate';
import ServicoUpdate from './components/adm/servicos/ServicoUpdate';


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
      <Route path="/adm/servicos" element={<ServicoRead />} />
      <Route path="/adm/servicos/create" element={<ServicoCreate />} />
      <Route path="/adm/servicos/update" element={<ServicoUpdate />} />

    </Routes>
  );
};

export default AppRoutes;
