// src/components/TestConnection.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';

const TestConnection = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await api.get('/test-connection');
        setResponse(res.data.message);
      } catch (error) {
        setResponse('Erro ao conectar com a API');
        console.error(error);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h1>Teste de Conexão com a API</h1>
      <p>{response}</p>
    </div>
  );
};

export default TestConnection;
