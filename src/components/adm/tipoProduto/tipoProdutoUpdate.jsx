import React, { useState, useEffect } from 'react';
import api from '../../../api/api.jsx';
import { useNavigate } from 'react-router-dom';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';
import '../admForm.css';

export default function TipoProdutoUpdate() {
  const navigate = useNavigate();
  const [id, setID] = useState(null);
  const [desc, setDesc] = useState('');
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    const id_tipo = localStorage.getItem('ID');
    const desc_tipo = localStorage.getItem('Desc');
    const ativo_tipo = localStorage.getItem('Checkbox Value') === '1';

    setID(id_tipo || '');
    setDesc(desc_tipo || '');
    setAtivo(ativo_tipo);
  }, []);

  const updateAPIData = () => {
    const updatedData = {
      desc,
      ativo: ativo ? 1 : 0 // Converte o valor booleano para 1 ou 0
    };

    api.put(`/tipoProduto/${id}`, updatedData)
      .then(response => {
        console.log("Update response:", response.data);
        navigate('/adm/tipoProduto');
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
        <h2>Alterar Tipo de Produto</h2>
        <form className="ui-form">
          <div className="campo-formulario">
            <label>Descrição</label>
            <input type="text" placeholder="Descrição" value={desc} onChange={(e) => setDesc(e.target.value)} />
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
