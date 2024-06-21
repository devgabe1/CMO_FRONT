// src/pages/homePage/LoginPage.jsx
import React from 'react';
import '../../styles/global.css'
import ChoiceBar from '../../components/choiceBar/choiceBar';


const LoginPage = () => {
  return (
    <div className='page-backgroundHome'>
    <div className="home-page-container">
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <div className="home-content">
        <h1>Bem-vindo à Página de login</h1>
        <p>Conteúdo da sua página de login aqui...</p>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
