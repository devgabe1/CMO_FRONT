// src/pages/homePage/HomePage.jsx
import React from 'react';
import Carousel from '../../components/carousel/carousel';
import ChoiceBar from '../../components/choiceBar/choiceBar';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <Carousel />
      <div className="home-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <p>Conteúdo da sua página inicial aqui...</p>
      </div>
    </div>
  );
};

export default HomePage;
