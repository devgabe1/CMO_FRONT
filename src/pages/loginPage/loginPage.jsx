import React, { useState } from 'react';
import api from '../../api/api.jsx'; // Certifique-se de que o caminho está correto
import './loginPage.css'; // Certifique-se de que você criou um arquivo CSS para estilos
import ChoiceBar from '../../components/choiceBar/choiceBar.jsx';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { usuario, senha });
      const { token } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      // Redirecionar para a página principal ou dashboard
      window.location.href = '/adm/Chamados';
    } catch (err) {
      setError('Usuário ou senha inválidos.');
      console.error(err);
    }
  };

  return (
    <div className='page-backgroundADMTable'>
    <div className="main-content">
      <ChoiceBar />
    </div>
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Entrar</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
