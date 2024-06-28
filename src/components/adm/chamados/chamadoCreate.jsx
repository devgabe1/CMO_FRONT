import React, { useState } from 'react';
import api from '../../../api/api.jsx';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';
import '../admForm.css';

export default function ChamadoCreate() {
  const [cliente, setCliente] = useState('');
  const [fone, setFone] = useState('');
  const [email, setEmail] = useState('');
  const [tipoProd, setTipoProd] = useState('');
  const [produto, setProduto] = useState('');
  const [marca, setMarca] = useState('');
  const [problema, setProblema] = useState('');

  const postChamado = () => {
    api.post(`/chamados`, {
      cliente,
      fone,
      email,
      tipoProd,
      produto,
      marca,
      problema
    }).then(() => {
      alert('Chamado gravado com sucesso');
    }).catch(error => {
      console.error("Error posting data:", error);
      alert('Erro ao gravar o chamado');
    });
  };

  return (
    <div className='page-backgroundADMTable'>
      <div className="main-content">
        <ChoiceBarADM />
      </div>
      <div className="formulario-container">
        <h2>Novo Chamado</h2>
        <form className="ui-form">
          <div className="campo-formulario">
            <label>Cliente</label>
            <input type="text" placeholder="Nome do Cliente" onChange={(e) => setCliente(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Telefone</label>
            <input type="text" placeholder="Telefone do Cliente" onChange={(e) => setFone(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Email</label>
            <input type="email" placeholder="Email do Cliente" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Tipo de Produto</label>
            <input type="text" placeholder="Tipo de Produto" onChange={(e) => setTipoProd(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Produto</label>
            <input type="text" placeholder="Produto" onChange={(e) => setProduto(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Marca</label>
            <input type="text" placeholder="Marca" onChange={(e) => setMarca(e.target.value)} />
          </div>
          <div className="campo-formulario">
            <label>Problema</label>
            <input type="text" placeholder="Problema" onChange={(e) => setProblema(e.target.value)} />
          </div>
          <button type="button" onClick={postChamado}>Gravar</button>
        </form>
      </div>
    </div>
  );
}
