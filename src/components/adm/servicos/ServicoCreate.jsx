import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/api.jsx';
import '../adm.css';

export default function ServicoCreate() {
  const [titulo, setTitulo] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImagem] = useState('');
  const [url, setURL] = useState('');
  const [ordem, setOrdem] = useState(0);
  const [ativo, setAtivo] = useState(false);
  const navigate = useNavigate();

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
      navigate('/adm/servicos');
    })
  }

  return (
    <div>
      <form className="ui-form">
        <div className="ui-form-field">
          <label>Título</label>
          <input placeholder='Título' onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="ui-form-field">
          <label>Descrição</label>
          <input placeholder='Descrição' onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="ui-form-field">
          <label>Imagem</label>
          <input placeholder='URL da Imagem' onChange={(e) => setImagem(e.target.value)} />
        </div>
        <div className="ui-form-field">
          <label>Link</label>
          <input placeholder='URL da página' onChange={(e) => setURL(e.target.value)} />
        </div>
        <div className="ui-form-field">
          <label>Ordem</label>
          <input placeholder='Ordem' onChange={(e) => setOrdem(e.target.value)} />
        </div>
        <div className="ui-form-field">
          <label>
            <input type="checkbox" checked={ativo} onChange={(e) => setAtivo(e.target.checked)} />
            Ativo
          </label>
        </div>
        <button type='button' onClick={postServico} className="ui-button">Gravar</button>
      </form>
    </div>
  )
}
