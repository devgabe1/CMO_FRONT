import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './choiceBar.css';

function ChoiceBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const options = [
    { label: 'Home', path: '/' },
    { label: 'Localização', path: '/localizacao' },
    { label: 'Serviços', path: '/servicos' },
    { label: 'Busca e Entrega', path: '/busca-e-entrega' },
    { label: 'Conserto em 30 Minutos', path: '/conserto' },
    { label: 'Contato', path: '/contato' },
  ];

  return (
    <div>
      <div className="choice-bar">
        <img src="../../../logoBranca.png" alt="Logo" className="logo" />
        <div className="choice-items">
          {options.map((option, index) => (
            <Link key={index} to={option.path} className="choice-item">
              {option.label}
            </Link>
          ))}
        </div>
        <span className="menu-icon" onClick={toggleSidebar}>
          &#9776;
        </span>
      </div>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <a href="#" className="close-btn" onClick={toggleSidebar}>
          &times;
        </a>
        <img src="../../../logoCmo.png" alt="Logo" className="logo" />
        {options.map((option, index) => (
          <Link key={index} to={option.path} onClick={toggleSidebar}>
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChoiceBar;
