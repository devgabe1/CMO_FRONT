import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../adm.css';
import api from '../../../api/api.jsx';

function ServicoRead() {
  const [APIData, setAPIData] = useState([]);
  
  useEffect(() => {
    api.get(`/admServicos`)
      .then((response) => {
        setAPIData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const setData = (data) => {
    let { id_servico, titulo_servico, desc_servico, img_servico, url_servico, ordem, ativo } = data;
    localStorage.setItem('ID', id_servico);
    localStorage.setItem('Titulo', titulo_servico);
    localStorage.setItem('Desc', desc_servico);
    localStorage.setItem('Imagem', img_servico);
    localStorage.setItem('URL', url_servico);
    localStorage.setItem('Ordem', ordem);
    localStorage.setItem('Checkbox Value', ativo);
  }

  const getData = () => {
    api.get(`/admServicos`)
      .then((getData) => {
        setAPIData(getData.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }

  const onDelete = (id) => {
    if (window.confirm('Tem certeza de excluir esse serviço do site?')) {
      api.delete(`/servicos/${id}`)
        .then(() => {
          getData();
        })
        .catch((error) => {
          console.error("Error deleting data from API:", error);
        });
    }
  }

  return (
    <div>
      <Link to='/adm/servicos/create'>
        <button className="ui-button">Novo</button>
      </Link>
      <h1>Cadastro de Serviços</h1>
      <table className="ui-table">
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
          {APIData.map((data) => (
            <tr key={data.id_servico}>
              <td>{data.titulo_servico}</td>
              <td>{data.desc_servico}</td>
              <td>{data.img_servico}</td>
              <td>{data.url_servico}</td>
              <td>{data.ordem}</td>
              <td>{data.ativo ? 'Ativo' : ''}</td>
              <td>
                <Link to='/adm/servicos/update'>
                  <button className="ui-button" onClick={() => setData(data)}>Alterar</button>
                </Link>
              </td>
              <td>
                <button className="ui-button" onClick={() => onDelete(data.id_servico)}>Desativar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ServicoRead;
