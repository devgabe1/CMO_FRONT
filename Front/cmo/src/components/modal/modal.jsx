// src/components/Modal.jsx
import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
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
