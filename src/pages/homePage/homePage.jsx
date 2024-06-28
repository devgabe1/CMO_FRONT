// src/pages/homePage/homePage.jsx
import React from 'react';
import '../../styles/global.css';
import Carousel from '../../components/carousel/carousel';
import ChoiceBar from '../../components/choiceBar/choiceBar';
import './homePage.css';
import { useNavigate } from 'react-router-dom';

const handleWhatsAppClick = () => {
  const phoneNumber = '554137950162';
  const message = 'Olá, gostaria de fazer um pedido de busca/entrega.';
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank'); 
};

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className='page-backgroundHome'>
      <div className="home-page-container">
        <div className="main-content"> 
          <ChoiceBar />
        </div>
        <div className="home-content">
          <h1>Assistência Técnica para as Melhores Marcas!</h1>
          <Carousel />
          <div className="content-section">
            <div className="content-left">
              <p className='p3'>Peça já seu orçamento!</p>
              <p className='p3'>Contate-nos, buscamos e entregamos seu aparelho</p>
              <button className="whatsapp-button" onClick={handleWhatsAppClick}>
                Pedir pelo WhatsApp
              </button>
            </div>
            <div className="content-right">
              <p className='p3'>Compareça a uma das lojas físicas!</p>
              <p className='p3'>Ambas as lojas contam com estacionamento!</p>
              <button className="whatsapp-button" onClick={() => navigate('/localizacao')}>
                Endereços
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
