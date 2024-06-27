import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api.jsx';
import '../admTable.css';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';

function ServicoRead() {
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(6);
  const [sortConfig, setSortConfig] = useState({ key: 'id_servico', direction: 'ascending' });
  const [showSortOptions, setShowSortOptions] = useState(false);

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

  // Sort services based on sortConfig
  const sortedServices = [...APIData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Logic for displaying current services
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = sortedServices.slice(indexOfFirstService, indexOfLastService);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(APIData.length / servicesPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setShowSortOptions(false); // Hide the sort options after selecting
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  return (
    <div className='page-backgroundADMTable'>
  <div className="main-content"> 
    <ChoiceBarADM />
  </div>
  <div className="table-container">
    <h1>Cadastro de Serviços</h1>
    <div className="button-container">
      <Link to='/adm/servicos/create'>
        <button className="button">Novo</button>
      </Link>
      <div className="sort-options">
        <button className="button" onClick={toggleSortOptions}>Ordenar</button>
        <ul className={`dropdown ${showSortOptions ? 'show' : ''}`}>
          <li onClick={() => requestSort('id_servico')}>Ordenar por ID</li>
          <li onClick={() => requestSort('ordem_apresentacao')}>Ordenar por Ordem</li>
          <li onClick={() => requestSort('ativo')}>Ordenar por Ativos/Inativos</li>
        </ul>
      </div>
    </div>
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
        {currentServices.map((data) => {
          return (
            <tr key={data.id_servico}>
              <td data-label="Título">{data.titulo_servico}</td>
              <td data-label="Descrição">{data.desc_servico}</td>
              <td data-label="Imagem">{data.img_servico}</td>
              <td data-label="Link">{data.url_servico}</td>
              <td data-label="Ordem">{data.ordem_apresentacao}</td>
              <td data-label="Ativo" className={data.ativo ? '' : 'inactive'}>
                {data.ativo ? 'Ativo' : 'Inativo'}
              </td>
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
    <div className="pagination">
      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </button>
      ))}
      <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>&raquo;</button>
    </div>
  </div>
</div>
  );
}

export default ServicoRead;
