// src/pages/LocationPage.jsx
import React from 'react';
import ChoiceBar from '../../components/choiceBar/choiceBar';

function photoPage() {
  return (
    <div>
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <h1>Fotos</h1>
      <p>Bem-vindo à página de Fotos.</p>
    </div>
  );
}

export default photoPage;
