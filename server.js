import http from "http";
import bodyParser from "body-parser";
import express from "express";
import sqlServer from "mssql";
import { error } from "console";
import jwt from "jsonwebtoken";

const dbConfig = {
server: "52.5.245.24",
database: "cmo",
user: "adminCMO",
password: "@Uniandrade_2024",
port: 1433,
options: {
  trustServerCertificate: true,
}
};

const conexao = sqlServer.connect(dbConfig, (err) => {
  if (err)
    console.log(err)
  else
    console.log('Conectado com SQL Server');
});

const SEGREDO = 'REMOTA';
const app = express();
const porta = 3000;

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

  //get servicos para o site
  app.get("/servicos", (req, res) => {
    conexao.query(
        `SELECT * FROM servico where ativo = 1 ORDER BY ORDEM_APRESENTACAO`)
        .then(result => res.json(result.recordset))
        .catch(err => res.json(err));
    });  

    //get para o adm
app.get("/admServicos/:id", (req, res) => {
  let id_servico = req.params.id;
  conexao.query(
      `SELECT * FROM servico`)
      .then(result => res.json(result.recordset))
      .catch(err => res.json(err));
  });
      
app.post("/servicos", (req, res) => {
  let tit = req.body.titulo;
  let desc = req.body.desc;
  let url = req.body.url;
  let img = req.body.img;
  let ordem = req.body.ordem;
  let ativo = '1';

conexao.query(`exec SP_Ins_Servico 
'${tit}', '${desc}', '${url}', 
'${img}', ${ordem}, ${ativo}`, (erro, resultado) => {
  if (erro) {
    console.log(erro);
    res.status(500).send('Problema ao inserir serviço');
  } else {
    console.log(resultado);
    res.status(200).send('Serviço inserido com sucesso');
  }
  });
});

app.put("/servicos", (req, res) => {
  
  let id = req.body.id_servico;
  let tit = req.body.titulo;
  let desc = req.body.desc;
  let url = req.body.url;
  let img = req.body.img;
  let ordem = req.body.ordem;
  let ativo = req.body.ativo;

conexao.query(`exec SP_Upd_Servico 
${ativo}, '${tit}', '${desc}', '${url}', 
'${img}', ${ordem}, ${ativo}`, (erro, resultado) => {
  if (erro) {
    console.log(erro);
    res.status(500).send('Problema ao atualizar serviço');
  } else {
    console.log(resultado);
    res.status(200).send('Atualização inserida com sucesso');
  }
  });
});


app.delete("/servicos/:id", (req, res) => {
  
  let id = req.params.id
conexao.query(`exec SP_Del_Servico 
${id}`, (erro, resultado) => {
  if (erro) {
    console.log(erro);
    res.status(500).send('Problema ao desativar serviço');
  } else {
    console.log(resultado);
    res.status(200).send('Desativação inserida com sucesso');
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
    `CALL sp_ed_marca(?, NULL, NULL, NULL, NULL, 'D')`, [id], (erro, linhas)=>{
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

  app.delete("/modelos", (req, res) =>{
    let id = req.body.id;
    conexao.query(
    `CALL sp_ed_modelo (?, NULL, 'D')`, [id], (erro, linhas)=>{
      if (erro){
        console.error("Erro ao desativar modelo", erro);
        res.status(500).send("Erro ao desativar modelo.");
      } else{
        console.log("Modelo desativado com sucesso", linhas);
        res.status(200).json(linhas);
      }
    }
  )
  });

  app.get("/produtos", (req, res) => {

    conexao.query(
      `SELECT * FROM produto;`, (erro, linhas) =>{
        if (erro){
          console.error("Erro ao selecionar produtos", erro);
          res.status(500).send("Erro ao selecionar produtos");
        } else{
          console.log("Produtos selecionadas com sucesso");
          res.status(200).json(linhas);
        }
      });
  });

  app.post("/produtos", (req, res) =>{
    let { desc, id_cliente, id_tipo, id_marca, id_modelo, numero_serie, capacidade_produto, problema_produto, data_cadastro} = req.body;

    conexao.query(
      `CALL sp_ins_produto ( ?, ?, ?, ?, ?, ?, ?, ?, ? )`, [ desc, id_cliente, id_tipo, id_marca, id_modelo, numero_serie, capacidade_produto, problema_produto, data_cadastro], (erro, linhas) =>{
        if (erro){
          console.error("Erro ao inserir produto", erro)
          res.status(500).send("Erro ao inserir produto");
        } else{
          console.log("Produto inserida com sucesso");
          res.status(200).json(linhas);
        }
      });
  }); 

  app.put("/produtos", (req, res) =>{
    let { id, desc, id_cliente, id_tipo, id_marca, id_modelo, numero_serie, capacidade_produto, problema_produto, data_cadastro, atv} = req.body;


    conexao.query(
      `CALL sp_ed_produto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'U' )`, [ id, desc, id_cliente, id_tipo, id_marca, id_modelo, numero_serie, capacidade_produto, problema_produto, data_cadastro, atv], (erro, linhas) =>{
        if (erro){
          console.error("Erro ao atualizar produto", erro);
          res.status(500).send("Erro ao atualizar produto.");
        } else{
          console.log("Produto atualizada com sucesso.");
          res.status(200).json(linhas);
        }
      }
    )
  });
  
  app.delete("/produtos", (req, res) =>{
    let { id } = req.body;

    conexao.query(
      `CALL sp_ed_produto(?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'D' )`, [ id ], (erro, linhas) =>{
        if (erro){
          console.error("Erro ao desativar produto", erro);
          res.status(500).send("Erro ao desativar produto.");
        } else{
          console.log("Produto desativado com sucesso.");
          res.status(200).json(linhas);
        }
      }
    )
  });

  app.get("/tipoProduto", (req, res) => {

    conexao.query(
      `SELECT * FROM tipoProduto;`, (erro, linhas) =>{
        if (erro){
          console.error("Erro ao selecionar tipos de produto", erro);
          res.status(500).send("Erro ao selecionar tipos de produtos");
        } else{
          console.log("Tipos de Produto selecionados com sucesso");
          res.status(200).json(linhas);
        }
      });
  });

  app.post("/tipoProduto", (req, res) =>{
    let { desc} = req.body;

    conexao.query(
      `CALL sp_ins_tipoproduto ( ? )`, [ desc], (erro, linhas) =>{
        if (erro){
          console.error("Erro ao inserir tipo de produto", erro)
          res.status(500).send("Erro ao inserir tipo de produto");
        } else{
          console.log("Tipo de produto inserido com sucesso");
          res.status(200).json(linhas);
        }
      });
  });
  
  app.put("/tipoProduto", (req, res) =>{
    let { id, desc, oper} = req.body;

    conexao.query(
      `CALL sp_ed_tipoproduto ( ?, ?, 'U' )`, [ id, desc, oper ], (erro, linhas) =>{
        if (erro){
          console.error("Erro ao editar tipo de produto", erro)
          res.status(500).send("Erro ao editar tipo de produto");
        } else{
          console.log("Tipo de produto editado com sucesso");
          res.status(200).json(linhas);
        }
      });
  }); 

  app.delete("/tipoProduto", (req, res) =>{
    let { id } = req.body;

    conexao.query(
      `CALL sp_ed_tipoproduto ( ?, NULL, 'D' )`, [ id ], (erro, linhas) =>{
        if (erro){
          console.error("Erro ao desativar tipo de produto", erro)
          res.status(500).send("Erro ao desativar tipo de produto");
        } else{
          console.log("Tipo de produto desativado com sucesso");
          res.status(200).json(linhas);
        }
      });
  }); 



