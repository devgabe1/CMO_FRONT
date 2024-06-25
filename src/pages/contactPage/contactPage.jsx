// src/pages/contactPage/contactPage.jsx

import React from 'react';
import './contactPage.css';
import '../../styles/global.css'

import ChoiceBar from '../../components/choiceBar/choiceBar';
import Form from '../../components/form/form';

function contactPage() {
  return (
    <div className='page-backgroundContact'>
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <div className='page-containerContact'>
      <h1>Contato</h1>
      <p>Bem-vindo à página de contato.</p>
      <p>Preencha o formulário abaixo e entraremos em contato.</p>
      </div>
      <Form />
    </div>
  );
}

export default contactPage;
