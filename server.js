import http from "http";
import bodyParser from "body-parser";
import express from "express";
import mysql from "mysql2";
import { error } from "console";
import jwt from "jsonwebtoken";

const SEGREDO = 'REMOTA';
const app = express();
const porta = 3000;
const conexao = mysql.createConnection({
    host: "localhost",
    port:3306,
    database:"casaondas",
    user: "root",
    password: ""
});

conexao.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(porta, () => {
    console.log("servidor rodando e escutando na porta 3000");
});
app.get("/", (req, resp)=> {
    resp.status(200).send("nosso servidor da CMO");
});

app.get("/servicos", (req, res) => {
    res.status(200).send("rotas para trazer o servicos");
});

let html = '';

// middleware
function verificarToken(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SEGREDO, (erro, decodificado) => {
      if(erro)
        return res.status(401).end();
      req.id = decodificado.id;
      next();
    });
  }
  
  app.post("/login", (req, res) => {
    let usu = req.body.usuario;
    let sen = req.body.senha;
  
    // conectar ao bd pra buscar o ID desse usuario
  
    //if usu e a senha for igual ao registrado na tabela do BD
    if(usu == "marcos" && sen == "123"){
      const id = 1; // isso vem do BD
  
      //token tem 3 partes = 1.) identifica o usuário 2.) segredo, opções 
      const token = jwt.sign({id}, SEGREDO, { expiresIn: 300}); // 5 min
  
      console.log("usuário marcos logou no sistema");
      return res.status(500).json({autenticado: true, token: token});
    };
    res.status(504).send("Usuário inválido ou inexitente");
  });

app.post("/servicos", (req, res) => {
    let tit = req.body.titulo;
    let desc = req.body.desc;
    let url = req.body.url;
    let img = 'imagem'; //req.body.img;
    let ordem = 1; //req.body.ordem;
    let ativo = true;

    conexao.query(
        `CALL SP_Ins_Servico(?, ?, ?, ?, ?)`, [tit, desc, img, ordem, url], (erro, linhas) => {
            if (erro) {
                console.error("Problema ao inserir Serviço:", erro);
                res.status(500).send("Problema ao inserir Serviço");
            } else {
                console.log(linhas);
                res.status(200).send("Serviço inserido no banco de dados com sucesso");
            }
        });
});
