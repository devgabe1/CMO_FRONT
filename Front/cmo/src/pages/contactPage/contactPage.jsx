// src/pages/LocationPage.jsx
import React from 'react';
import ChoiceBar from '../../components/choiceBar/choiceBar';
import Form from '../../components/form/form';

function contactPage() {
  return (
    <div>
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <h1>Contato</h1>
      <p>Bem-vindo à página de contato.</p>
      <Form />
    </div>
  );
}

export default contactPage;
