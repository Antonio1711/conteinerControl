import { useState } from 'react';
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import './style.scss';

export default function AddConteiner() {
    const [cliente, setCliente] = useState('');
    const [numConteiner, setNumConteiner] = useState('');
    const [tipoConteiner, setTipoConteiner] = useState('');
    const [status, setStatus] = useState('');
    const [categoria, setCategoria] = useState('');

    const addConteiner = () => {
        let data = {
            cliente: cliente,
            num_conteiner: numConteiner,
            tipo_conteiner: tipoConteiner,
            status: status,
            categoria: categoria
        }

        Axios.post("http://localhost:3002/registraConteiner", data).then((response) => {
            console.log(response.data.msg);
        });
    }

    const onSubmit = () => {
        addConteiner();
        
    }

    return(
        <div className='cardForm'>
            <Form onSubmit={onSubmit}>
                <h2>Adicionar contêiner</h2>

                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Control 
                        required 
                        type="text" 
                        name="cliente" 
                        placeholder="Insira o nome do cliente" 
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
                    >
                        <option>Insira o status do container</option>
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
                    >
                        <option>Insira a categoria do container</option>
                        <option value="importacao">Importação</option>
                        <option value="exportacao">Exportação</option>
                    </Form.Select>
                </Form.Group>

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