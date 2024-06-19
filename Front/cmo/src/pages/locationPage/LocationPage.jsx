import React from 'react';
import './locationPage.css'; // Importa o arquivo de estilos CSS
import ChoiceBar from '../../components/choiceBar/choiceBar';

function LocationPage() {
  return (
    <div className="page-container">
      <div className="main-content"> 
        <ChoiceBar />
      </div>
      <h1>Localização</h1>
      <p>Bem-vindo à nossa página de localização.</p>
      <p>Encontre-nos nos endereços abaixo:</p>

      <div className="locations-container">
        <div className="location-section">
          <h2>Loja 1</h2>
          <p>Rua Exemplo, 123, Bairro Exemplo, Cidade A, Estado, CEP 12345-678</p>
          <div className="map-container">
            <iframe
              title="Localização Loja 1"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8959476676594!2d-122.41941548468113!3d37.77492927975971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c1b7ef61b%3A0x4e9f5b1c1b2d0e!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbr!4v1634634163154!5m2!1sen!2sbr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="location-section">
          <h2>Loja 2</h2>
          <p>Rua Exemplo, 456, Bairro Exemplo, Cidade B, Estado, CEP 98765-432</p>
          <div className="map-container">
            <iframe
              title="Localização Loja 2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8959476676594!2d-122.41941548468113!3d37.77492927975971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c1b7ef61b%3A0x4e9f5b1c1b2d0e!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbr!4v1634634163154!5m2!1sen!2sbr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationPage;
