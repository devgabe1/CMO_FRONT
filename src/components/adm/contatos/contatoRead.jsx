import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api.jsx';
import '../admTable.css';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';

function ContatoRead() {
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortConfig, setSortConfig] = useState({ key: 'id_contato', direction: 'ascending' });
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    api.get(`/admcontato`)
      .then((response) => {
        setAPIData(response.data);
      });

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const setData = (data) => {
    let { id_contato, nome_cliente, assunto, mensagem, dt_contato, resposta, dt_resposta } = data;
    localStorage.setItem('ID', id_contato);
    localStorage.setItem('NomeCliente', nome_cliente);
    localStorage.setItem('Assunto', assunto);
    localStorage.setItem('Mensagem', mensagem);
    localStorage.setItem('DtContato', dt_contato);
    localStorage.setItem('Resposta', resposta);
    localStorage.setItem('DtResposta', dt_resposta);
  };

  const getData = () => {
    api.get(`/admcontato`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const sortedItems = [...APIData].sort((a, b) => {
    const aKey = a[sortConfig.key];
    const bKey = b[sortConfig.key];

    if (typeof aKey === 'number' && typeof bKey === 'number') {
      return sortConfig.direction === 'ascending' ? aKey - bKey : bKey - aKey;
    } else {
      if (aKey < bKey) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aKey > bKey) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPageNumbers = Math.ceil(APIData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    setSortConfig({ key, direction });
    setShowSortOptions(false);
  };

  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };

  const renderPageNumbers = () => {
    const pageButtons = [];

    pageButtons.push(
      <button key="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
        &laquo;
      </button>
    );

    pageButtons.push(
      <button key="page1" onClick={() => paginate(1)} className={currentPage === 1 ? 'active' : ''}>
        1
      </button>
    );

    if (isSmallScreen) {
      if (currentPage === 2) {
        pageButtons.push(
          <button key="current" onClick={() => paginate(2)} className="active">
            2
          </button>
        );
      } else if (currentPage > 2) {
        pageButtons.push(
          <button key="current" onClick={() => paginate(currentPage)} className="active">
            {currentPage}
          </button>
        );
        if (currentPage < totalPageNumbers - 1) {
          pageButtons.push(<span key="ellipsis">...</span>);
        }
      }

      if (currentPage !== totalPageNumbers) {
        pageButtons.push(
          <button
            key="last"
            onClick={() => paginate(totalPageNumbers)}
            className={currentPage === totalPageNumbers ? 'active' : ''}
          >
            {totalPageNumbers}
          </button>
        );
      }
    } else {
      for (let i = 2; i <= totalPageNumbers; i++) {
        pageButtons.push(
          <button key={i} onClick={() => paginate(i)} className={currentPage === i ? 'active' : ''}>
            {i}
          </button>
        );
      }
    }

    pageButtons.push(
      <button key="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPageNumbers}>
        &raquo;
      </button>
    );

    return pageButtons;
  };

  return (
    <div className='page-backgroundADMTable'>
      <div className="main-content">
        <ChoiceBarADM />
      </div>
      <div className="table-container">
        <h1>Cadastro de Contatos</h1>
        <div className="button-container">
          <Link to='/adm/contatos/create'>
            <button className="button">Novo</button>
          </Link>
          <div className="sort-options">
            <button className="button" onClick={toggleSortOptions}>Ordenar</button>
            <ul className={`dropdown ${showSortOptions ? 'show' : ''}`}>
              <li onClick={() => requestSort('id_contato')}>Ordenar por ID</li>
            </ul>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Cliente</th>
              <th>Assunto</th>
              <th>Mensagem</th>
              <th>Data do Contato</th>
              <th>Resposta</th>
              <th>Data da Resposta</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => {
              return (
                <tr key={data.id_contato}>
                  <td data-label="ID">{data.id_contato}</td>
                  <td data-label="Nome do Cliente">{data.nome_cliente}</td>
                  <td data-label="Assunto">{data.assunto}</td>
                  <td data-label="Mensagem">{data.mensagem}</td>
                  <td data-label="Data do Contato">{formatDate(data.dt_contato)}</td>
                  <td data-label="Resposta">{data.resposta}</td>
                  <td data-label="Data da Resposta">{data.dt_resposta ? formatDate(data.dt_resposta) : ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="pagination">
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
}

export default ContatoRead;
