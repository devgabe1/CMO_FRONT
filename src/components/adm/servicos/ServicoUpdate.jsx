import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import api from '../../../api/api.jsx';
import { useNavigate } from 'react-router-dom';

export default function ServicoUpdate() {
    const navigate = useNavigate();
    const [id, setID] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [desc, setDesc] = useState('');
    const [imagem, setImagem] = useState('');
    const [url, setURL] = useState('');
    const [ordem, setOrdem] = useState(0);
    const [ativo, setAtivo] = useState(false);

    useEffect(() => {
        setID(localStorage.getItem('ID'));
        setTitulo(localStorage.getItem('Titulo'));
        setDesc(localStorage.getItem('Desc'));
        setImagem(localStorage.getItem('Imagem'));
        setURL(localStorage.getItem('URL'));
        setOrdem(localStorage.getItem('Ordem'));
        setAtivo(localStorage.getItem('Ativo') === 'true');
    }, []);

    const updateAPIData = () => {
        api.put(`servicos/${id}`, {
            titulo,
            desc,
            img: imagem,
            url,
            ordem,
            ativo
        }).then(() => {
            navigate('/adm/servicos');
        });
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>Título</label>
                    <input value={titulo} placeholder='Título' onChange={(e) => setTitulo(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Descrição</label>
                    <input value={desc} placeholder='Descrição' onChange={(e) => setDesc(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Imagem</label>
                    <input value={imagem} placeholder='URL da Imagem' onChange={(e) => setImagem(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Link</label>
                    <input value={url} placeholder='URL da página' onChange={(e) => setURL(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Ordem</label>
                    <input value={ordem} placeholder='Ordem' onChange={(e) => setOrdem(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox checked={ativo} label='Ativo' onChange={() => setAtivo(!ativo)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Atualizar</Button>
            </Form>
        </div>
    )
}
