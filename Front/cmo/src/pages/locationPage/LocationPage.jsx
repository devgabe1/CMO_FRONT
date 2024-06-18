// src/pages/LocationPage.jsx
import React from 'react';
import ChoiceBar from '../../components/choiceBar/choiceBar';

function locationPage() {
  return (
    <div>
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <h1>Localização</h1>
      <p>Bem-vindo à página de localização.</p>
    </div>
  );
}

export default locationPage;
