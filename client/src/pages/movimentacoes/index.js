import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button, Table } from 'react-bootstrap';

export default function Movimentacoes() {
    const [movimentacoes, setMovimentacoes] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/movimentacoes").then((response) => {
            setMovimentacoes(response.data);
            console.log(response.data)
        })
    }, [])

    const deleteMov = (numMov) => {
        Axios.delete(`http://localhost:3002/deletaMovimento/${numMov}`).then((response) => {
            console.log(response.data.msg);
        })
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tipo</th>
                        <th>Data/hora início</th>
                        <th>Data/hora fim</th>
                        <th>Nº do Conteiner</th>
                        <th></th>
                    </tr>
                </thead>

                {movimentacoes.map((val) => (
                    <React.Fragment key={val.idMov}>
                        <tbody>
                            <tr>
                                <td>{val.idMov}</td>
                                <td>{val.tipo_movimentacao}</td>
                                <td>{val.datahora_inicio}</td>
                                <td>{val.datahora_fim}</td>
                                <td>{val.numconteiner_mov}</td>
                                <td>
                                    <Button variant="danger" onClick={() => {
                                        deleteMov(val.idMov);
                                        window.location.reload();
                                    }} >Excluir</Button>
                                </td>
                            </tr>
                        </tbody>
                    </React.Fragment>
                ))}
            </Table>
            {' '}<Button variant="primary" href="/addMov">Adicionar Movimentação</Button>
        </>
    )
}