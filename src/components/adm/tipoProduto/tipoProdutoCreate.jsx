import React, { useState } from 'react';
import api from '../../../api/api.jsx';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';
import '../admForm.css';

export default function TipoProdutoCreate() {
  const [desc, setDesc] = useState('');
  const [ativo, setAtivo] = useState(false);

  const postTipoProduto = () => {
    api.post(`/tipoProduto`, {
      desc,
      ativo
    }).then(() => {
      alert('Tipo de Produto gravado com sucesso');
    }).catch(error => {
      console.error("Error posting data:", error);
      alert('Erro ao gravar o tipo de produto');
    });
  };

  return (
    <div className='page-backgroundADMTable'>
      <div className="main-content">
        <ChoiceBarADM />
      </div>
      <div className="formulario-container">
        <h2>Novo Tipo de Produto</h2>
        <form className="ui-form">
          <div className="campo-formulario">
            <label>Descrição</label>
            <input type="text" placeholder="Descrição" onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="campo-formulario checkbox-container">
            <label htmlFor="ativo">Ativo</label>
            <input type="checkbox" id="ativo" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
          </div>
          <button type="button" onClick={postTipoProduto}>Gravar</button>
        </form>
      </div>
    </div>
  );
}
