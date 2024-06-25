// src/components/adm/servicos/ServicoRead.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api.jsx';
import '../adm.css';

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

  const onDelete = (id) => {
    if (window.confirm('Tem certeza de excluir esse serviço do site?')) {
      api.delete(`/servicos/${id}`)
        .then(() => {
          getData();
        });
    }
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
            <th>Desativar</th>
          </tr>
        </thead>
        <tbody>
          {APIData.map((data) => {
            return (
              <tr key={data.id_servico}>
                <td>{data.titulo_servico}</td>
                <td>{data.desc_servico}</td>
                <td>{data.img_servico}</td>
                <td>{data.url_servico}</td>
                <td>{data.ordem_apresentacao}</td>
                <td>{data.ativo ? 'Ativo' : ''}</td>
                <td>
                  <Link to='/adm/servicos/update'>
                    <button className="button" onClick={() => setData(data)}>Alterar</button>
                  </Link>
                </td>
                <td>
                  <button className="button" onClick={() => onDelete(data.id_servico)}>Desativar</button>
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
