Casa do Microondas
Status: Em Desenvolvimento ⚠️

Este é um site planejado pela minha equipe quando realizamos o CMO de um site de micro-ondas.
Casa do Microondas
Casa do Microondas é um site desenvolvido para uma empresa que oferece serviços de reparo de micro-ondas. O objetivo do site é ser uma plataforma simples e altamente funcional para que os clientes possam solicitar serviços e obter informações sobre os serviços oferecidos.

Funcionalidades
Agendamento de Reparo: Permite que os usuários agendem serviços de reparo.
Consulta de Serviços: Lista os serviços oferecidos pela empresa.
Contato: Formulário de contato para suporte e dúvidas.
Tecnologias Utilizadas
Frontend: HTML, CSS, JavaScript, React
Backend: Node.js, Express.js
Banco de Dados: MySQL
Requisitos
Node.js
MySQL
Instalação
Clone o repositório: 
git clone https://github.com/devgabe1/CMO_BACK
git clone https://github.com/devgab1/CMO_FRONT


bash
Copiar código
git clone https://github.com/devgabe1/CMO_BACK
git clone https://github.com/devgab1/CMO_FRONT
Instale as dependências do projeto para backend e frontend:
cd CMO_BACK
npm install
cd ../CMO_FRONT
npm install


bash
Copiar código
cd CMO_BACK
npm install
cd ../CMO_FRONT
npm install
Configure o banco de dados MySQL:
Crie um banco de dados no MySQL.
Atualize as informações de conexão do banco de dados no arquivo de configuração do backend (config.js).


Crie um banco de dados no MySQL.
Atualize as informações de conexão do banco de dados no arquivo de configuração do backend (config.js).
Execute as migrações do banco de dados:
cd CMO_BACK
npm run migrate


bash
Copiar código
cd CMO_BACK
npm run migrate
Inicie o servidor backend:
npm start


bash
Copiar código
npm start
Inicie o servidor frontend:
cd ../CMO_FRONT
npm start


bash
Copiar código
cd ../CMO_FRONT
npm start
O site estará disponível em http://localhost:3000.

Uso
Agendar Reparo:

Vá para a página de agendamento.
Preencha o formulário com suas informações e detalhes do micro-ondas.
Envie o formulário para agendar um reparo.
Consultar Serviços:

Navegue até a página de serviços.
Verifique a lista de serviços oferecidos pela empresa.
Contato:

Use o formulário de contato para enviar dúvidas ou solicitar suporte.
Capturas de Tela

Descrição da captura de tela da página inicial.


Descrição da captura de tela da página de agendamento.

Documentação da API
Endpoints
GET /api/services: Recuperar uma lista de serviços.
POST /api/schedule: Agendar um reparo.
POST /api/contact: Enviar uma dúvida ou solicitação de suporte.
Testes
Para executar os testes, use o seguinte comando:

bash
Copiar código
npm test
Implantação
Para implantar o projeto, siga estas etapas:

Configure seu ambiente de produção (por exemplo, Heroku, AWS).
Configure as variáveis de ambiente para o banco de dados de produção.
Execute o script de implantação:
bash
Copiar código
npm run deploy
Contribuição
Faça um fork do repositório.
Crie uma nova branch (git checkout -b feature/new-feature).
Commit suas alterações (git commit -m 'Add new feature').
Faça push para a branch (git push origin feature/new-feature).
Abra um Pull Request.
Licença
Este projeto está licenciado sob a Licença MIT.

Agradecimentos
Agradecimentos a Nome do Contribuidor pela configuração inicial.
Agradecimentos especiais à comunidade Biblioteca/Framework pelo suporte.
