// src/components/form/form.jsx

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

  // Estado para armazenar os erros de validação dos campos
  const [formErrors, setFormErrors] = useState({
    email: '',
    telefone: ''
  });

  // Função para lidar com as mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Aplicar máscara no campo de telefone
    if (name === 'telefone') {
      // Remove caracteres não numéricos e os parênteses da máscara
      const cleaned = ('' + value).replace(/\D/g, '');

      // Verifica se a máscara deve ser aplicada
      let telefoneFormatted = '';
      if (cleaned.length >= 2) {
        telefoneFormatted = `(${cleaned.slice(0, 2)}`;
        if (cleaned.length > 2) {
          telefoneFormatted += `) ${cleaned.slice(2, 7)}`;
        }
        if (cleaned.length > 7) {
          telefoneFormatted += `-${cleaned.slice(7, 11)}`;
        }
      } else {
        telefoneFormatted = cleaned;
      }

      setFormData(prevState => ({
        ...prevState,
        [name]: telefoneFormatted
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    // Realiza a validação do campo conforme necessário
    validateField(name, value);
  };

  // Função para validar o campo de email
  const validateEmail = (email) => {
    // Expressão regular para validar email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Função para validar o campo de telefone
  const validateTelefone = (telefone) => {
    // Expressão regular para validar telefone com apenas números após o DDD
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(telefone);
  };

  // Função para validar o campo especificado
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'email':
        const emailValid = validateEmail(value);
        setFormErrors(prevState => ({
          ...prevState,
          email: emailValid ? '' : 'Email inválido'
        }));
        break;
      case 'telefone':
        const telefoneValid = validateTelefone(value);
        setFormErrors(prevState => ({
          ...prevState,
          telefone: telefoneValid ? '' : 'Telefone inválido'
        }));
        break;
      default:
        break;
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar todos os campos antes de enviar
    const emailValid = validateEmail(formData.email);
    const telefoneValid = validateTelefone(formData.telefone);

    // Se algum campo não for válido, exibir mensagem de erro
    if (!emailValid || !telefoneValid) {
      alert('Por favor, corrija os erros no formulário antes de enviar.');
      return;
    }

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
    setFormErrors({
      email: '',
      telefone: ''
    });
  };

  return (
    <div className="formulario-container">
      <h2>Formulário de Contato</h2>
      <form onSubmit={handleSubmit}>
        <div className={`campo-formulario ${formErrors.nome ? 'com-erro' : ''}`}>
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
        <div className={`campo-formulario ${formErrors.email ? 'com-erro' : ''}`}>
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
          {formErrors.email && <span className="mensagem-erro">{formErrors.email}</span>}
        </div>
        <div className={`campo-formulario ${formErrors.assunto ? 'com-erro' : ''}`}>
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
        <div className={`campo-formulario ${formErrors.telefone ? 'com-erro' : ''}`}>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="(99) 99999-9999"
            maxLength="15" // Limita o número máximo de caracteres (incluindo a máscara)
            required
          />
          {formErrors.telefone && <span className="mensagem-erro">{formErrors.telefone}</span>}
        </div>
        <div className={`campo-formulario ${formErrors.mensagem ? 'com-erro' : ''}`}>
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
