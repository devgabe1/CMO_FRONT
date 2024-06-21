import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './choiceBar.css';

function ChoiceBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <div className={`menu-icon ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
          {options.map((option, index) => (
            <Link key={index} to={option.path} className="dropdown-item" onClick={toggleDropdown}>
              {option.label}
            </Link>
          ))}
        </div>
    </div>
  );
}

export default ChoiceBar;
