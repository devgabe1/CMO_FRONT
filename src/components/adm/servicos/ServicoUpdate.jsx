// src/components/adm/servicos/ServicoUpdate.jsx
import React, { useState, useEffect } from 'react';
import api from '../../../api/api.jsx';
import { useNavigate } from 'react-router-dom';
import '../adm.css';

export default function ServicoUpdate() {
  const navigate = useNavigate();
  const [id, setID] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [imagem, setImagem] = useState('');
  const [url, setURL] = useState('');
  const [ordem, setOrdem] = useState('');
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const id_servico = localStorage.getItem('ID');
    const titulo_servico = localStorage.getItem('Titulo');
    const desc_servico = localStorage.getItem('Desc');
    const img_servico = localStorage.getItem('Imagem');
    const url_servico = localStorage.getItem('URL');
    const ordem_apresentacao = localStorage.getItem('Ordem');
    const ativo_servico = localStorage.getItem('Checkbox Value') === 'true';

    setID(id_servico || '');
    setTitulo(titulo_servico || '');
    setDesc(desc_servico || '');
    setImagem(img_servico || '');
    setURL(url_servico || '');
    setOrdem(ordem_apresentacao || '');
    setAtivo(ativo_servico);
  }, []);

  const updateAPIData = () => {
    api.put(`/servicos/${id}`, {
      titulo,
      desc,
      img: imagem,
      url,
      ordem: parseInt(ordem), // Certifique-se de que a ordem é um número
      ativo
    }).then(() => {
      navigate('/adm/servicos');
    }).catch(error => {
      console.error("Error updating data:", error);
    });
  };

  return (
    <div className="formulario-container">
      <h2>Alterar Serviço</h2>
      <form className="ui-form">
        <div className="campo-formulario">
          <label>Título</label>
          <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>Descrição</label>
          <input type="text" placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>Imagem</label>
          <input type="text" placeholder="URL da Imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>Link</label>
          <input type="text" placeholder="URL da página" value={url} onChange={(e) => setURL(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>Ordem</label>
          <input type="text" placeholder="Ordem" value={ordem} onChange={(e) => setOrdem(e.target.value)} />
        </div>
        <div className="campo-formulario">
          <label>
            <input type="checkbox" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
            Ativo
          </label>
        </div>
        <button type="button" onClick={updateAPIData}>Update</button>
      </form>
    </div>
  );
}
