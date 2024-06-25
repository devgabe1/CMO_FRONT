// src/components/adm/servicos/ServicoCreate.jsx
import React, { useState } from 'react';
import api from '../../../api/api.jsx';
import '../adm.css';

export default function ServicoCreate() {
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImagem] = useState('');
  const [url, setURL] = useState('');
  const [ordem, setOrdem] = useState(0);
  const [ativo, setAtivo] = useState(false);

  const postServico = () => {
    api.post(`/servicos`, {
      titulo,
      desc,
      img,
      url,
      ordem,
      ativo
    }).then(() => {
      alert('Serviço gravado com sucesso');
    });
  };

  return (
    <div className="formulario-container">
      <h2>Novo Serviço</h2>
      <form className="ui-form">
        <div className="campo-formulario">
          <label>Título</label>
          <input type="text" placeholder="Título" onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>Descrição</label>
          <input type="text" placeholder="Descrição" onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>Imagem</label>
          <input type="text" placeholder="URL da Imagem" onChange={(e) => setImagem(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>Link</label>
          <input type="text" placeholder="URL da página" onChange={(e) => setURL(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>Ordem</label>
          <input type="text" placeholder="Ordem" onChange={(e) => setOrdem(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>
            <input type="checkbox" checked={ativo} onChange={() => setAtivo(!ativo)} />
            Ativo
          </label>
        </div>
        <button type="button" onClick={postServico}>Gravar</button>
      </form>
    </div>
  );
}
