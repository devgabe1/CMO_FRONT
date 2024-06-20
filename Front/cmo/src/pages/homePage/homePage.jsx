// src/pages/homePage/HomePage.jsx
import React from 'react';
import '../../styles/global.css'
import Carousel from '../../components/carousel/carousel';
import ChoiceBar from '../../components/choiceBar/choiceBar';
import './homePage.css'

const HomePage = () => {
  return (
    <div className='page-backgroundHome'>
    <div className="home-page-container">
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <div className="home-content">
        <h1>Bem-vindo à Página Inicial</h1>
        <p>Conteúdo da sua página inicial aqui...</p>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
