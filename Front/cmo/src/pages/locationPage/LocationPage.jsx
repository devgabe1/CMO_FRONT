import React from 'react';
import './locationPage.css'; // Importa o arquivo de estilos CSS
import '../../styles/global.css'
import ChoiceBar from '../../components/choiceBar/choiceBar';

function LocationPage() {
  return (
    <div className='page-backgroundLocation'>
    <div className="page-containerLocation">
      <div className="main-content"> 
        <ChoiceBar />
      </div>
      <h1>Localização</h1>
      <p>Encontre-nos nos endereços abaixo:</p>
      <p>Ambas as lojas contam com estacionamento!</p>

      <div className="locations-container">
        <div className="location-section">
          <h2>Loja 1</h2>
          <p>Av. Pres. Kennedy, 410 - Rebouças</p>
          <div className="map-container">
            <iframe
              title="Localização Loja 1"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7205.100835950869!2d-49.265392!3d-25.453290000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce48c9e3e3e4b%3A0x94da37baf10ee50e!2sAv.%20Pres.%20Kennedy%2C%20410%20-%20Rebou%C3%A7as%2C%20Curitiba%20-%20PR%2C%2080220-200%2C%20Brasil!5e0!3m2!1spt-PT!2sus!4v1718795539507!5m2!1spt-PT!2sus"              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="location-section">
          <h2>Loja 2</h2>
          <span className='adress'>R. Saturnino Miranda, 84 - Santa Felicidade</span>
          <div className="map-container">
            <iframe
              title="Localização Loja 2"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28833.134075078815!2d-49.334163!3d-25.400065000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce1ae328a748b%3A0x7cfdac29470a291d!2sR.%20Saturnino%20Miranda%2C%2084%20-%20Santa%20Felicidade%2C%20Curitiba%20-%20PR%2C%2082030-320%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1718795658385!5m2!1spt-BR!2sus"              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LocationPage;
