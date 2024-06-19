// src/pages/LocationPage.jsx
import React from 'react';
import ChoiceBar from '../../components/choiceBar/choiceBar';
import './deliveryPage.css'; // Importa o arquivo de estilos CSS
import '../../styles/global.css'

function DeliveryPage() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '554198988376';
    const message = 'Olá, gostaria de fazer um pedido de busca/entrega.';
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank'); 
  };

  return (
    <div className='page-backgroundDelivery'>
    <div className="page-containerDelivery">
      <div className="main-content"> 
        <ChoiceBar />
      </div>
      <h1>Busca e entrega em Curitiba</h1>
      <p>Realize seu pedido pelo WhatsApp e agende um horário.</p>
      <button className="whatsapp-button" onClick={handleWhatsAppClick}>
        Pedir pelo WhatsApp
      </button>
    </div>
    </div>
  );
}

export default DeliveryPage;
