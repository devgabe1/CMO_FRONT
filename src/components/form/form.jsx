import React, { useState } from 'react';
import api from '../../api/api.jsx'; // Certifique-se de que o caminho está correto
import './form.css'; // Arquivo de estilos CSS

const FormularioContato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    telefone: '',
    mensagem: ''
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    telefone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      const cleaned = ('' + value).replace(/\D/g, '');
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

    validateField(name, value);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateTelefone = (telefone) => {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(telefone);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValid = validateEmail(formData.email);
    const telefoneValid = validateTelefone(formData.telefone);

    if (!emailValid || !telefoneValid) {
      alert('Por favor, corrija os erros no formulário antes de enviar.');
      return;
    }

    const contatoData = {
      nome: formData.nome,
      email: formData.email,
      assunto: formData.assunto,
      telefone: formData.telefone,
      mensagem: formData.mensagem
    };

    console.log("Dados enviados:", contatoData);
    
    api.post(`/contato`, contatoData)
      .then(() => {
        alert('Contato enviado com sucesso');
      })
      .catch(error => {
        console.error("Erro ao enviar contato:", error);
        alert('Erro ao enviar o contato');
      });

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
