// src/pages/ServicePage.jsx
import React, { useState } from 'react';
import './servicePage.css'; // Importa o CSS específico para esta página
import Modal from '../../components/modal/modal';
import microwaveRepair from '../../styles/images/microwave-repair.png';
import ovenRepair from '../../styles/images/oven-repair.png';
import microwaveRefurbish from '../../styles/images/microwave-refurbish.png';
import accessories from '../../styles/images/accessories.png';
import newUsedMicrowave from '../../styles/images/new-used-microwave.png';
import deliveryService from '../../styles/images/delivery-service.png';
import ChoiceBar from '../../components/choiceBar/choiceBar';

function ServicePage() {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      name: "Conserto de Microondas",
      shortDescription: [
        "Consertamos o seu forno em 30 minutos,",
        "Serviço com garantia"
      ],
      fullDescription: [
        "Consertamos o seu forno em 30 minutos.",
        "Utilizamos peças originais.",
        "Serviço com garantia de 6 meses.",
        "Atendimento rápido e eficiente."
      ],
      imageUrl: microwaveRepair
    },
    {
      name: "Conserto de Forno Elétrico",
      shortDescription: [
        "Consertamos seu forno em 4 horas.",
        "Reformamos.",
        "Serviço com garantia."
      ],
      fullDescription: [
        "Consertamos seu forno em 4 horas.",
        "Reformamos fornos de diversas marcas.",
        "Serviço com garantia de 1 ano.",
        "Peças de reposição originais."
      ],
      imageUrl: ovenRepair
    },
    {
      name: "Reforma de Microondas",
      shortDescription: [
        "Se o seu aparelho é antigo e tem ferrugem, vale a pena reformar.",
        "Aparelhos antigos são mais duráveis."
      ],
      fullDescription: [
        "Se o seu aparelho é antigo e tem ferrugem, vale a pena reformar.",
        "Aparelhos antigos são mais duráveis.",
        "Reformamos e deixamos como novo.",
        "Garantia de 1 ano para reformas."
      ],
      imageUrl: microwaveRefurbish
    },
    {
      name: "Acessórios para Microondas",
      shortDescription: [
        "Temos pratos, roldanas, cruzetas e outros acessórios para forno de microondas.",
        "Traga a marca e modelo de seu microondas."
      ],
      fullDescription: [
        "Temos pratos, roldanas, cruzetas e outros acessórios para forno de microondas.",
        "Traga a marca e modelo de seu microondas.",
        "Acessórios originais e compatíveis.",
        "Garantia de 6 meses em todos os acessórios."
      ],
      imageUrl: accessories
    },
    {
      name: "Microondas Novos e Usados",
      shortDescription: [
        "Temos microondas a pronta entrega, diversas marcas e modelos direto da fábrica 110v e 220v.",
        "Também locamos microondas."
      ],
      fullDescription: [
        "Temos microondas a pronta entrega, diversas marcas e modelos direto da fábrica 110v e 220v.",
        "Modelos novos e seminovos.",
        "Garantia de até 2 anos.",
        "Serviço de locação com preços competitivos."
      ],
      imageUrl: newUsedMicrowave
    },
    {
      name: "Busca e Entrega",
      shortDescription: [
        "Oferecemos serviços de busca e entrega para sua comodidade."
      ],
      fullDescription: [
        "Oferecemos serviços de busca e entrega para sua comodidade.",
        "Retiramos e entregamos seu aparelho em sua casa.",
        "Serviço rápido e seguro.",
        "Atendemos toda a cidade e região."
      ],
      imageUrl: deliveryService
    }
  ];

  return (
    <div className='page-backgroundService'>
    <div className="service-page-container">
      <div className="main-content"> 
      <ChoiceBar />
      </div>
      <h1>Nossos Serviços</h1>
      <div className="services-list">
        {services.map((service, index) => (
          <div
            className="service-item"
            key={service.name}
            onClick={() => setSelectedService(service)}
          >
            <img src={service.imageUrl} alt={service.name} className="service-image"/>
            <div className="service-info">
              <h3>{service.name}</h3>
              {service.shortDescription.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      )}
    </div>
    </div>
  );
}

export default ServicePage;
