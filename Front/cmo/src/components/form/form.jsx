import React, { useState } from 'react';
import './form.css'; // Arquivo de estilos CSS

const FormularioContato = () => {
  // Estado para armazenar os valores dos campos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    telefone: '',
    mensagem: ''
  });

  // Função para lidar com as mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados do formulário
    console.log(formData); // Exemplo de como lidar com os dados, substitua com sua lógica de envio
    // Limpar o formulário após o envio (opcional)
    setFormData({
      nome: '',
      email: '',
      assunto: '',
      telefone: '',
      mensagem: ''
    });
  };

  return (
    <div className="formulario-container">
      <h2>Formulário de Contato</h2>
      <form onSubmit={handleSubmit}>
        <div className="campo-formulario">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
          />
        </div>
        <div className="campo-formulario">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="campo-formulario">
          <label htmlFor="assunto">Assunto:</label>
          <input
            type="text"
            id="assunto"
            name="assunto"
            value={formData.assunto}
            onChange={handleChange}
            placeholder="Digite o assunto"
            required
          />
        </div>
        <div className="campo-formulario">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
          />
        </div>
        <div className="campo-formulario">
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            placeholder="Digite sua mensagem"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormularioContato;
