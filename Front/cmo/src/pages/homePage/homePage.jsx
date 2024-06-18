// src/pages/homePage/HomePage.jsx
import React from 'react';
import Carousel from '../../components/carousel/carousel';

const HomePage = () => {
  return (
    <div className="home-page">
      <Carousel />
      <div className="home-content">
        <h2>Bem-vindo à Página Inicial</h2>
        <p>Conteúdo da sua página inicial aqui...</p>
      </div>
    </div>
  );
};

export default HomePage;
