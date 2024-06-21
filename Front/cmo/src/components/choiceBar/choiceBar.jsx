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
    { label: 'Login', path: '/login' } 
  ];

  return (
    <div>
      <div className="choice-bar">
        <Link to="/" className="logo-link">
          <img src="../../../logoBranca.png" alt="Logo" className="logo" />
        </Link>
        <div className="choice-items">
        {options.slice(0, -1).map((option, index) => ( // Exclui login do dropdown
            <Link key={index} to={option.path} className="choice-item">
              {option.label}
            </Link>
          ))}
        </div>
              <Link to="/login" className="login-icon">
          <img src="../../../logoLogin.png" alt="Login" className="login-logo" />
        </Link>
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
