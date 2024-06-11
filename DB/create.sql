
CREATE TABLE TipoProduto (
id_tipo INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
desc_tipo VARCHAR(100) NOT NULL);

CREATE TABLE Modelo (
id_modelo INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
desc_modelo VARCHAR(100));

CREATE TABLE Marca (
id_marca INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
desc_marca VARCHAR(100),
logo_marca VARCHAR(100),
url_marca VARCHAR(100));

ALTER TABLE Marca ADD COLUMN fl_marca BOOLEAN;

CREATE TABLE Produto (
id_produto INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
desc_produto VARCHAR(100),
id_cliente INTEGER,
id_tipo INTEGER,
id_marca INTEGER,
id_modelo INTEGER,
nr_serie VARCHAR(50),
capacidade INTEGER,
problema VARCHAR(1000),
dt_cadastro DATETIME);

CREATE TABLE Servico (
id_servico INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
titulo_servico VARCHAR(100),
desc_servico VARCHAR(500),
img_servico VARCHAR(100),
ordem_apresentacao INTEGER, -- se ordem_apresentacao = 0 o serviço não será apresentado
url_servico varCHAR(100));

ALTER TABLE Servico ADD COLUMN fl_servico BOOLEAN;