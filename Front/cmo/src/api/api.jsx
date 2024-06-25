// src/api/api.jsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http:localhost:3000' // Substitua pelo endereço da sua API
});

export default api;
