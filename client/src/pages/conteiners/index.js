import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Table } from 'react-bootstrap';

export default function Conteiners() {
    const [conteiners, setConteiners] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3002/conteiners`)
        .then((response) => {
            setConteiners(response.data);
        })
    }, [])

    const deleteConteiner = (numConteiner) => {
        Axios.delete(`http://localhost:3002/deletaConteiner/${numConteiner}`).then((response) => {
            console.log(response.data.msg);
        })
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Nº</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        <th>Categoria</th>
                        <th></th>
                    </tr>
                </thead>

                {conteiners.map((val) => (
                    <React.Fragment key={val.numConteiner}>
                        <tbody>
                            <tr>
                                <td>{val.cliente}</td>
                                <td>{val.num_conteiner}</td>
                                <td>{val.tipo_conteiner}</td>
                                <td>{val.status}</td>
                                <td>{val.categoria}</td>
                                <td>
                                    <Button variant="warning" href={`editConteiner/${val.num_conteiner}`} >Editar</Button>{' '}
                                    <Button variant="danger" onClick={() => {
                                        deleteConteiner(val.num_conteiner);
                                        window.location.reload();
                                    }} >Excluir</Button>
                                </td>
                            </tr>
                        </tbody>
                    </React.Fragment>
                ))}
            </Table>
            {' '}<Button variant="primary" href="/addConteiner">Adicionar Conteiner</Button>
        </>
    )
}