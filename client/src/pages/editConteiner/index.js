import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

export default function EditConteiner() {
    const { num_conteiner } = useParams();
    const [conteiner, setConteiner] = useState([]);
    const [cliente, setCliente] = useState('');
    const [numConteiner, setNumConteiner] = useState('');
    const [tipoConteiner, setTipoConteiner] = useState('');
    const [status, setStatus] = useState('');
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        Axios.get(`http://localhost:3002/conteiners/${num_conteiner}`,)
        .then((response) => {
            setCliente(response.data.cliente);
            setNumConteiner(response.data.num_conteiner);
            setTipoConteiner(response.data.tipo_conteiner);
            setStatus(response.data.cliente);
            setCategoria(response.data.cliente);
            setConteiner(response.data)

            console.log(response.data)
        })
    }, [])

    const updateConteiner = () => {
        let data = {
            cliente: cliente,
            num_conteiner: numConteiner,
            tipo_conteiner: tipoConteiner,
            status: status,
            categoria: categoria
        }

        Axios.put(`http://localhost:3002/editaConteiner/${num_conteiner}`, data).then((response) => {
            console.log(response.data.msg);
        })
    }

    return (
        <div className='cardForm'>
            <Form onSubmit={updateConteiner}>
                <h2>Adicionar contêiner</h2>

                {conteiner.map((val) => (
                    <React.Fragment key={val.num_conteiner}>

                        <Form.Group className="mb-3">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="cliente"
                                placeholder={"Insira o nome do cliente"}
                                defaultValue={val.cliente}
                                onChange={(e) => {
                                    setCliente(e.target.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nº do contêiner</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="num_conteiner"
                                placeholder="Insira o nº do contêiner"
                                defaultValue={val.num_conteiner}
                                onChange={(e) => {
                                    setNumConteiner(e.target.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de contêiner</Form.Label>
                            <Form.Select
                                required
                                name="tipo_conteiner"
                                onChange={(e) => {
                                    setTipoConteiner(e.target.value)
                                }}
                                defaultValue={val.tipo_conteiner}
                            >
                                <option>Insira o tipo de container</option>
                                <option value="20">20</option>
                                <option value="40">40</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                required
                                type="text"
                                name="status"
                                onChange={(e) => {
                                    setStatus(e.target.value)
                                }}
                                defaultValue={val.status}
                            >
                                <option value="cheio">Cheio</option>
                                <option value="vazio">Vazio</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select
                                required
                                type="text"
                                name="categoria"
                                onChange={(e) => {
                                    setCategoria(e.target.value)
                                }}
                                defaultValue={val.categoria}
                            >
                                <option value="importacao">Importação</option>
                                <option value="exportacao">Exportação</option>
                            </Form.Select>
                        </Form.Group>
                    </React.Fragment>
                ))}
                <div className="button-group">
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                    <Button variant="danger" href="/">
                        Voltar
                    </Button>
                </div>
            </Form>
        </div>
    )
}