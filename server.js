import http from "http";
import bodyParser from "body-parser";
import express from "express";
import mysql from "mysql";
import { error } from "console";

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
