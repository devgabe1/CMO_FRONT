// src/components/adm/servicos/ServicoRead.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api.jsx';
import '../admTable.css';

function ServicoRead() {
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    api.get(`/admServicos`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  const setData = (data) => {
    let { id_servico, titulo_servico, desc_servico, img_servico, url_servico, ordem_apresentacao, ativo } = data;
    localStorage.setItem('ID', id_servico);
    localStorage.setItem('Titulo', titulo_servico);
    localStorage.setItem('Desc', desc_servico);
    localStorage.setItem('Imagem', img_servico);
    localStorage.setItem('URL', url_servico);
    localStorage.setItem('Ordem', ordem_apresentacao);
    localStorage.setItem('Checkbox Value', ativo);
  };

  const getData = () => {
    api.get(`/admServicos`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const toggleStatus = (data) => {
    const updatedData = {
      id: data.id_servico,
      titulo: data.titulo_servico,
      desc: data.desc_servico,
      img: data.img_servico,
      url: data.url_servico,
      ordem: data.ordem_apresentacao,
      ativo: data.ativo ? 0 : 1
    };

    api.put(`/servicos/${data.id_servico}`, updatedData)
      .then(() => {
        getData();
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className="table-container">
      <Link to='/adm/servicos/create'>
        <button className="button">Novo</button>
      </Link>
      <h2>Cadastro de Serviços</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Imagem</th>
            <th>Link</th>
            <th>Ordem</th>
            <th>Ativo</th>
            <th>Alterar</th>
            <th>Ativar/Desativar</th>
          </tr>
        </thead>
        <tbody>
  {APIData.map((data) => {
    return (
      <tr key={data.id_servico}>
        <td data-label="Título">{data.titulo_servico}</td>
        <td data-label="Descrição">{data.desc_servico}</td>
        <td data-label="Imagem">{data.img_servico}</td>
        <td data-label="Link">{data.url_servico}</td>
        <td data-label="Ordem">{data.ordem_apresentacao}</td>
        <td data-label="Ativo">{data.ativo ? 'Ativo' : 'Inativo'}</td>
        <td data-label="Alterar">
          <Link to='/adm/servicos/update'>
            <button className="button" onClick={() => setData(data)}>Alterar</button>
          </Link>
        </td>
        <td data-label="Ativar/Desativar">
          <button className="button" onClick={() => toggleStatus(data)}>
            {data.ativo ? 'Desativar' : 'Ativar'}
          </button>
        </td>
      </tr>
    )
  })}
</tbody>
      </table>
    </div>
  );
}

export default ServicoRead;
