// src/api/api.jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000' // Certifique-se de que o endereço do backend está correto
});

export default api;
