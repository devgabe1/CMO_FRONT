// src/components/adm/servicos/ServicoRead.jsx
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
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
  }

  const onDelete = (id) => {
    if (window.confirm('Tem certeza de excluir esse serviço do site?')) {
      api.delete(`/servicos/${id}`)
        .then(() => {
          getData();
        })
    }
  }

  return (
    <div>
      <Link to='/adm/servicos/create'>
        <Button>Novo</Button>
      </Link>
      <h1>Cadastro de Serviços</h1>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Título</Table.HeaderCell>
            <Table.HeaderCell>Descrição</Table.HeaderCell>
            <Table.HeaderCell>Imagem</Table.HeaderCell>
            <Table.HeaderCell>Link</Table.HeaderCell>
            <Table.HeaderCell>Ordem</Table.HeaderCell>
            <Table.HeaderCell>Ativo</Table.HeaderCell>
            <Table.HeaderCell>Alterar</Table.HeaderCell>
            <Table.HeaderCell>Desativar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row key={data.id_servico}>
                <Table.Cell>{data.titulo_servico}</Table.Cell>
                <Table.Cell>{data.desc_servico}</Table.Cell>
                <Table.Cell>{data.img_servico}</Table.Cell>
                <Table.Cell>{data.url_servico}</Table.Cell>
                <Table.Cell>{data.ordem}</Table.Cell>
                <Table.Cell>{data.ativo ? 'Ativo' : ''}</Table.Cell>
                <Table.Cell>
                  <Link to='/adm/servicos/update'>
                    <Button onClick={() => setData(data)}>Alterar</Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id_servico)}>Desativar</Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ServicoRead;
