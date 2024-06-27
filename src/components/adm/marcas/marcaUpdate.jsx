import React, { useState, useEffect } from 'react';
import api from '../../../api/api.jsx';
import { useNavigate } from 'react-router-dom';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';
import '../admForm.css';

export default function MarcaUpdate() {
  const navigate = useNavigate();
  const [id, setID] = useState(null);
  const [desc, setDesc] = useState('');
  const [logo, setLogo] = useState('');
  const [url, setURL] = useState('');
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const id_marca = localStorage.getItem('ID');
    const desc_marca = localStorage.getItem('Desc');
    const logo_marca = localStorage.getItem('Imagem');
    const url_marca = localStorage.getItem('URL');
    const ativo_marca = localStorage.getItem('Checkbox Value') === '1';

    setID(id_marca || '');
    setDesc(desc_marca || '');
    setLogo(logo_marca || '');
    setURL(url_marca || '');
    setAtivo(ativo_marca);
  }, []);

  const updateAPIData = () => {
    const updatedData = {
      desc,
      logo,
      url,
      atv: ativo ? 1 : 0 // Converte o valor booleano para 1 ou 0
    };

    api.put(`/marcas/${id}`, updatedData)
      .then(response => {
        console.log("Update response:", response.data);
        navigate('/adm/marcas');
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className='page-backgroundADMTable'>
      <div className="main-content">
        <ChoiceBarADM />
      </div>
      <div className="formulario-container">
        <h2>Alterar Marca</h2>
        <form className="ui-form">
          <div className="campo-formulario">
            <label>Descrição</label>
            <input type="text" placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Logo</label>
            <input type="text" placeholder="URL do Logo" value={logo} onChange={(e) => setLogo(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Link</label>
            <input type="text" placeholder="URL da página" value={url} onChange={(e) => setURL(e.target.value)} />
          </div>
          <div className="campo-formulario checkbox-container">
            <label htmlFor="ativo">Ativo</label>
            <input type="checkbox" id="ativo" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
          </div>
          <button type="button" onClick={updateAPIData}>Update</button>
        </form>
      </div>
    </div>
  );
}
