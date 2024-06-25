// src/components/modal/modal.jsx
import React, { useEffect, useState } from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, service }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
      }, 300); // O tempo deve coincidir com a duração da animação de saída
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'hide' : ''}`}>
      <div className={`modal-content ${isClosing ? 'hide' : ''}`}>
        <button className="close-button" onClick={() => {
          setIsClosing(true);
          setTimeout(onClose, 300); // Sincronizar com a animação de saída
        }}>&times;</button>
        <div className="modal-body">
          <img src={service.imageUrl} alt={service.name} className="modal-image"/>
          <div className="modal-description">
            <h3>{service.name}</h3>
            {service.fullDescription.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
