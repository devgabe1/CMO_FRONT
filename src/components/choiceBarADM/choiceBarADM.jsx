// src/components/choiceBarADM/choiceBarADM.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './choiceBarADM.css';

function ChoiceBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const options = [
    { label: 'Chamados', path: '/adm/chamados' },
    { label: 'Tipo de Produto', path: '/adm/tipoProduto' },
    { label: 'Marcas', path: '/adm/marcas' },
    { label: 'Serviços', path: '/adm/servicos' },
    { label: 'Login', path: '/adm/servicos' } 
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
