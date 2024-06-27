import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api.jsx';
import '../admTable.css';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';

function TipoProdutoRead() {
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortConfig, setSortConfig] = useState({ key: 'id_tipoProduto', direction: 'ascending' });
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    api.get(`/admTipoProduto`)
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
    let { id_tipo, desc_tipo, ativo } = data;
    localStorage.setItem('ID', id_tipo);
    localStorage.setItem('Desc', desc_tipo);
    localStorage.setItem('Checkbox Value', ativo);
  };

  const getData = () => {
    api.get(`/admTipoProduto`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const toggleStatus = (data) => {
    const updatedData = {
      id: data.id_tipo,
      desc: data.desc_tipo,
      ativo: data.ativo ? 0 : 1
    };

    api.put(`/tipoProduto/${data.id_tipoProduto}`, updatedData)
      .then(() => {
        getData();
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  const sortedItems = [...APIData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPageNumbers = Math.ceil(APIData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
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
        <h1>Cadastro de Tipos de Produtos</h1>
        <div className="button-container">
          <Link to='/adm/tipoProduto/create'>
            <button className="button">Novo</button>
          </Link>
          <div className="sort-options">
            <button className="button" onClick={toggleSortOptions}>Ordenar</button>
            <ul className={`dropdown ${showSortOptions ? 'show' : ''}`}>
              <li onClick={() => requestSort('id_tipoProduto')}>Ordenar por ID</li>
              <li onClick={() => requestSort('ativo')}>Ordenar por Ativos/Inativos</li>
            </ul>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Ativo</th>
              <th>Alterar</th>
              <th>Ativar/Desativar</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data) => {
              return (
                <tr key={data.id_tipo}>
                  <td data-label="Descrição">{data.desc_tipo}</td>
                  <td data-label="Ativo" className={data.ativo ? '' : 'inactive'}>
                    {data.ativo ? 'Ativo' : 'Inativo'}
                  </td>
                  <td data-label="Alterar">
                    <Link to='/adm/tipoProduto/update'>
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
          {renderPageNumbers()}
        </div>
      </div>
    </div>
  );
}

export default TipoProdutoRead;
