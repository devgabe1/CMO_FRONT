// src/pages/LocationPage.jsx
import React from 'react';
import ChoiceBar from '../../components/choiceBar/choiceBar';
import './deliveryPage.css'; // Importa o arquivo de estilos CSS

function DeliveryPage() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5511999999999'; // Substitua pelo número de telefone da sua loja com o código do país
    const message = 'Olá, gostaria de fazer um pedido de delivery.';
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="page-container">
      <div className="main-content"> 
        <ChoiceBar />
      </div>
      <h1>Busca e entrega em Curitiba</h1>
      <p>Realize seu pedido pelo WhatsApp e agende um horário.</p>
      <button className="whatsapp-button" onClick={handleWhatsAppClick}>
        Pedir pelo WhatsApp
      </button>
    </div>
  );
}

export default DeliveryPage;
