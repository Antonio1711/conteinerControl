import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';

export default function AddMov() {
    const [tipoMovimentacao, setTipoMovimentacao] = useState('');
    const [dataHora_inicio, SetDataHora_inicio] = useState('');
    const [dataHora_fim, SetDataHora_fim] = useState('');
    const [numConteiner_mov, setNumConteiner_mov] = useState('');
    const [conteiners, setConteiners] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3002/conteiners/`,)
        .then((response) => {
            // setCliente(response.data.cliente);
            // setNumConteiner(response.data.num_conteiner);
            // setTipoConteiner(response.data.tipo_conteiner);
            // setStatus(response.data.cliente);
            // setCategoria(response.data.cliente);
            setConteiners(response.data)

            console.log(response.data)
        })
    }, [])

    const addMov = () => {
        let data = {
            tipo_movimentacao: tipoMovimentacao,
            dataHora_inicio: dataHora_inicio,
            dataHora_fim: dataHora_fim,
            numConteiner_mov: numConteiner_mov
        }

        Axios.post("http://localhost:3002/registraMovimento", data).then((response) => {
            console.log(response.data.msg);
        });
    }

    const onSubmit = () => {
        addMov();
    }

    return (
        <div className='cardForm'>
            <Form onSubmit={onSubmit}>
                <h2>Adicionar Movimentação</h2>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo de Movimentação</Form.Label>
                    <Form.Select 
                        required 
                        name="tipo_movimentacao" 
                        onChange={(e) => {
                            setTipoMovimentacao(e.target.value)
                        }}
                    >
                        <option>Insira o tipo de container</option>
                        <option value="embarque">Embarque</option>
                        <option value="descarga">Descarga</option>
                        <option value="gate_in">Gate in</option>
                        <option value="gate_out">Gate out</option>
                        <option value="reposicionamento">Reposicionamento</option>
                        <option value="pesagem">Pesagem</option>
                        <option value="scanner">Scanner</option>
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Data/Hora Início</Form.Label>
                    <Form.Control 
                        required 
                        type="datetime-local" 
                        name="dataHora_inicio"
                        onChange={(e) => {
                            SetDataHora_inicio(e.target.value + ':00')
                        }}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Data/Hora fim</Form.Label>
                    <Form.Control 
                        required 
                        type="datetime-local" 
                        name="dataHora_fim"
                        onChange={(e) => {
                            SetDataHora_fim(e.target.value + ':00')
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nº do container</Form.Label>
                    <Form.Select 
                        required 
                        type="text" 
                        name="numConteiner_mov" 
                        onChange={(e) => {
                            setNumConteiner_mov(e.target.value)
                        }}
                    >
                        <option>Insira o Nº do container</option>
                        {conteiners.map((val) => (
                            <option value={val.num_conteiner}>{val.num_conteiner}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <div className="button-group">
                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>{' '}
                    <Button variant="danger" href="/movimentacoes">
                        Voltar
                    </Button>
                </div>
            </Form>
        </div>
    )
}