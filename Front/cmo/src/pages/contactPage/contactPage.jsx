// src/pages/LocationPage.jsx
import React from 'react';
import './contactPage.css';
import ChoiceBar from '../../components/choiceBar/choiceBar';
import Form from '../../components/form/form';

function contactPage() {
  return (
    <div>
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <div className='page-container'>
      <h1>Contato</h1>
      <p>Bem-vindo à página de contato.</p>
      <p>Preencha o formulário abaixo e entraremos em contato.</p>
      </div>
      <Form />
    </div>
  );
}

export default contactPage;
