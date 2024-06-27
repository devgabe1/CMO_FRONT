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
import MarcaRead from './components/adm/marcas/marcaRead';
import MarcaUpdate from './components/adm/marcas/marcaUpdate';
import MarcaCreate from './components/adm/marcas/marcaCreate';
import TipoProdutoRead from './components/adm/tipoProduto/tipoProdutoRead';
import TipoProdutoUpdate from './components/adm/tipoProduto/tipoProdutoUpdate';


import TestConnection from './components/TestConnection'; // Importa o componente de teste

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
      <Route path="/adm/marcas" element={<MarcaRead />} />
      <Route path="/adm/marcas/update" element={<MarcaUpdate />} />
      <Route path="/adm/marcas/create" element={<MarcaCreate />} />
      <Route path="/adm/tipoProduto" element={<TipoProdutoRead />} />
      <Route path="/adm/tipoProduto/update" element={<TipoProdutoUpdate />} />
      <Route path="/test-connection" element={<TestConnection />} /> {/* Rota para o teste */}
    </Routes>
  );
};

export default AppRoutes;
