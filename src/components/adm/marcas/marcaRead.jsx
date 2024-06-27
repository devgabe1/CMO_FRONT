import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../api/api.jsx';
import '../admTable.css';
import ChoiceBarADM from '../../choiceBarADM/choiceBarADM';

function MarcaRead() {
  const [APIData, setAPIData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandsPerPage] = useState(6);
  const [sortConfig, setSortConfig] = useState({ key: 'id_marca', direction: 'ascending' });
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    api.get(`/admMarcas`)
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
    let { id_marca, desc_marca, logo_marca, url_marca, ativo } = data;
    localStorage.setItem('ID', id_marca);
    localStorage.setItem('Desc', desc_marca);
    localStorage.setItem('Imagem', logo_marca);
    localStorage.setItem('URL', url_marca);
    localStorage.setItem('Checkbox Value', ativo);
  };

  const getData = () => {
    api.get(`/admMarcas`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };

  const toggleStatus = (data) => {
    const updatedData = {
      id: data.id_marca,
      desc: data.desc_marca,
      logo: data.logo_marca,
      url: data.url_marca,
      atv: data.ativo ? 0 : 1
    };

    api.put(`/marcas/${data.id_marca}`, updatedData)
      .then(() => {
        getData();
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  };

  const sortedBrands = [...APIData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = sortedBrands.slice(indexOfFirstBrand, indexOfLastBrand);

  const totalPageNumbers = Math.ceil(APIData.length / brandsPerPage);

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
    if (isSmallScreen) {
      return (
        <>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            &laquo;
          </button>
          <button onClick={() => paginate(1)} className={currentPage === 1 ? 'active' : ''}>
            1
          </button>
          {currentPage > 2 && currentPage < totalPageNumbers && (
            <>
              <button onClick={() => paginate(currentPage)} className="active">
                {currentPage}
              </button>
              {currentPage < totalPageNumbers - 1 && <span>...</span>}
            </>
          )}
          {currentPage === 2 && (
            <button onClick={() => paginate(2)} className="active">
              2
            </button>
          )}
          {currentPage >= totalPageNumbers && (
            <button onClick={() => paginate(totalPageNumbers)} className="active">
              {totalPageNumbers}
            </button>
          )}
          {totalPageNumbers > 2 && currentPage < totalPageNumbers && (
            <button
              onClick={() => paginate(totalPageNumbers)}
              className={currentPage === totalPageNumbers ? 'active' : ''}
            >
              {totalPageNumbers}
            </button>
          )}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPageNumbers}>
            &raquo;
          </button>
        </>
      );
    }
  
    const pageButtons = [];
    for (let i = 1; i <= totalPageNumbers; i++) {
      pageButtons.push(
        <button key={i} onClick={() => paginate(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }
  
    return pageButtons;
  };
  
  return (
    <div className='page-backgroundADMTable'>
      <div className="main-content">
        <ChoiceBarADM />
      </div>
      <div className="table-container">
        <h1>Cadastro de Marcas</h1>
        <div className="button-container">
          <Link to='/adm/marcas/create'>
            <button className="button">Novo</button>
          </Link>
          <div className="sort-options">
            <button className="button" onClick={toggleSortOptions}>Ordenar</button>
            <ul className={`dropdown ${showSortOptions ? 'show' : ''}`}>
              <li onClick={() => requestSort('id_marca')}>Ordenar por ID</li>
              <li onClick={() => requestSort('ativo')}>Ordenar por Ativos/Inativos</li>
            </ul>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Logo</th>
              <th>URL</th>
              <th>Ativo</th>
              <th>Alterar</th>
              <th>Ativar/Desativar</th>
            </tr>
          </thead>
          <tbody>
            {currentBrands.map((data) => {
              return (
                <tr key={data.id_marca}>
                  <td data-label="Descrição">{data.desc_marca}</td>
                  <td data-label="Logo">{data.logo_marca}</td>
                  <td data-label="URL">{data.url_marca}</td>
                  <td data-label="Ativo" className={data.ativo ? '' : 'inactive'}>
                    {data.ativo ? 'Ativo' : 'Inativo'}
                  </td>
                  <td data-label="Alterar">
                    <Link to='/adm/marcas/update'>
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

export default MarcaRead;
