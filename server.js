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
    port:3307,
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
      return res.status(200).json({autenticado: true, token: token});
    };
    res.status(504).send("Usuário inválido ou inexitente");
  });

  app.get("/servicos", (req, res) => {
    conexao.query(
        `SELECT * FROM servico where fl_servico IS TRUE`, (erro, linhas) =>{
            if (erro) {
                console.error("Problema ao selecionar servico", erro);
                res.status(500).send("Problema ao selecionar servico");
            } else {
                console.log("Serviço selecionado com sucesso");
                res.status(200).json(linhas);
            }
        });
});

app.post("/servicos", (req, res) => {
  let { tit, desc, url, img, ordem, atv } = req.body;

    conexao.query(
        `CALL SP_Ins_Servico(?, ?, ?, ?, ?, ?)`, [tit, desc, img, ordem, url, atv], (erro, linhas) => {
            if (erro) {
                console.error("Problema ao inserir Serviço:", erro);
                res.status(500).send("Problema ao inserir Serviço");
            } else {
                console.log(linhas);
                res.status(200).send("Serviço inserido no banco de dados com sucesso");
            }
        });
});

app.put("/servicos", (req, res) => {
  let { id, tit, desc, img, ordem, url, atv } = req.body;

  conexao.query(
    `CALL sp_ed_servico(?, ?, ?, ?, ?, ?, ?, 'U')`, [id, tit, desc, img, ordem, url, atv], (erro, linhas)=>{
      if (erro){
        console.error("Problema ao editar servico", erro);
        res.status(500).send("Problema ao editar servico");
      }else{
        console.log(linhas);
        res.status(200).send("Servico alterado com sucesso");
      }
    });

});

app.delete("/servicos", (req, res)=>{
  let id = req.body.id;

  conexao.query(
    `CALL sp_ed_servico(?, NULL, NULL, NULL, NULL, NULL, NULL, 'D')`, [id], (erro, linhas)=>{
      if (erro){
        console.error("Problema ao alterar servico", erro);
        res.status(500).send("Problema ao alterar servico");
      } else{
        console.log(linhas);
        res.status(200).send("Servico alterado com sucesso")
      }
    });
});

app.get("/marcas", (req, res) => {
    html = 
    `<html>
       <head>
         <title>Projeto CMO</title>
       </head>
       <body>
         <h1>Casa do Micro-Ondas</h1>
         <p>Este é o projeto do novo site da Casa do Micro-Ondas.</p>
       </body>
    </html>`;
    conexao.query(
      `SELECT * FROM marca WHERE fl_marca IS TRUE;`, (erro, linhas) =>{
        if (erro){
          console.error("Erro ao selecionar marcas", erro);
          res.status(500).send("Erro ao selecionar marcas");
        } else{
          console.log("Marcas selecionadas com sucesso");
          res.status(200).json(linhas);
        }
      });
      //lista = html
  });

  app.post("/marcas", (req, res) =>{
    let { desc, url, logo, atv} = req.body;

    conexao.query(
      `CALL sp_ins_marca ( ?, ?, ?, ?)`, [ desc, url, logo, atv], (erro, linhas) =>{
        if (erro){
          console.error("Erro ao inserir marca", erro)
          res.status(500).send("Erro ao inserir marca");
        } else{
          console.log("Marca inserida com sucesso");
          res.status(200).json(linhas);
        }
      });
  });

  app.put("/marcas", (req, res) =>{
    let { id, desc, logo, url, atv } = req.body;

    conexao.query(
      `CALL sp_ed_marca(?, ?, ?, ?, ?, 'U')`, [id, desc, logo, url, atv], (erro, linhas)=>{
        if (erro){
          console.error("Erro ao atualizar marca", erro);
          res.status(500).send("Erro ao atualizar marca.");
        } else{
          console.log("Marca atualizada com sucesso.");
          res.status(200).json(linhas);
        }
      }
    )
  });

  app.delete("/marcas", (req, res) =>{
    let id = req.body.id;
    conexao.query(
    `CALL sp_ed_marca(?, NULL, NULL, NULL, NULL, 'd')`, [id], (erro, linhas)=>{
      if (erro){
        console.error("Erro ao desativar marca", erro);
        res.status(500).send("Erro ao desativar marca.");
      } else{
        console.log("Marca atualizada com sucesso", linhas);
        res.status(200).json(linhas);
      }
    }
  )
  });

  app.get("/modelos", (req, res) => {

    conexao.query(
      `SELECT * FROM modelo;`, (erro, linhas) =>{
        if (erro){
          console.error("Erro ao selecionar modelos", erro);
          res.status(500).send("Erro ao selecionar modelos");
        } else{
          console.log("Modelos selecionadas com sucesso");
          res.status(200).json(linhas);
        }
      });
      //lista = html
  });

  app.post("/modelos", (req, res) =>{
    let { desc } = req.body;

    conexao.query(
      `CALL sp_ins_modelo ( ? )`, [ desc ], (erro, linhas) =>{
        if (erro){
          console.error("Erro ao inserir modelo", erro)
          res.status(500).send("Erro ao inserir modelo");
        } else{
          console.log("Modelo inserida com sucesso");
          res.status(200).json(linhas);
        }
      });
  });

  app.put("/modelos", (req, res) =>{
    let { id, desc } = req.body;

    conexao.query(
      `CALL sp_ed_modelo(?, ?, 'U')`, [id, desc], (erro, linhas)=>{
        if (erro){
          console.error("Erro ao atualizar modelos", erro);
          res.status(500).send("Erro ao atualizar modelos.");
        } else{
          console.log("Modelos atualizada com sucesso.");
          res.status(200).json(linhas);
        }
      }
    )
  });

  app.delete("/marcas", (req, res) =>{
    let id = req.body.id;
    conexao.query(
    `CALL sp_ed_marca(?, NULL, NULL, NULL, NULL, 'd')`, [id], (erro, linhas)=>{
      if (erro){
        console.error("Erro ao desativar marca", erro);
        res.status(500).send("Erro ao desativar marca.");
      } else{
        console.log("Marca atualizada com sucesso", linhas);
        res.status(200).json(linhas);
      }
    }
  )
  });