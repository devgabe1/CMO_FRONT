import React, { useState } from 'react';
import api from '../../../api/api.jsx';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';
import '../admForm.css';

export default function MarcaCreate() {
  const [desc, setDesc] = useState('');
  const [logo, setLogo] = useState('');
  const [url, setURL] = useState('');
  const [ativo, setAtivo] = useState(false);

  const postMarca = () => {
    api.post(`/marcas`, {
      desc,
      logo,
      url,
      ativo
    }).then(() => {
      alert('Marca gravada com sucesso');
    }).catch(error => {
      console.error("Error posting data:", error);
      alert('Erro ao gravar a marca');
    });
  };

  return (
    <div className='page-backgroundADMTable'>
      <div className="main-content">
        <ChoiceBarADM />
      </div>
      <div className="formulario-container">
        <h2>Nova Marca</h2>
        <form className="ui-form">
          <div className="campo-formulario">
            <label>Descrição</label>
            <input type="text" placeholder="Descrição" onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Logo</label>
            <input type="text" placeholder="URL do Logo" onChange={(e) => setLogo(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Link</label>
            <input type="text" placeholder="URL da página" onChange={(e) => setURL(e.target.value)} />
          </div>
          <div className="campo-formulario checkbox-container">
            <label htmlFor="ativo">Ativo</label>
            <input type="checkbox" id="ativo" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
          </div>
          <button type="button" onClick={postMarca}>Gravar</button>
        </form>
      </div>
    </div>
  );
}
