// src/pages/LocationPage.jsx
import React from 'react';
import ChoiceBar from '../../components/choiceBar/choiceBar';

function deliveryPage() {
  return (
    <div>
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <h1>Busca e Entrega</h1>
      <p>Bem-vindo à página de Busca e entrega.</p>
    </div>
  );
}

export default deliveryPage;
