import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table } from 'react-bootstrap';

export default function Relatorios() {
    const [relatorios, setRelatorios] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/relatorioMov").then((response) => {
            setRelatorios(response.data);
            console.log(response.data)
        })

        Axios.get("http://localhost:3002/relatorioTotal").then((response) => {
            setTotal(response.data);
            console.log(response.data)
        })
    }, [])

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Tipo</th>
                        <th>Nº Conteiner</th>
                    </tr>
                </thead>
                <tbody>
                    {relatorios.map((val) => (
                        <React.Fragment>
                            <tr>
                                <td>{val.cliente}</td>
                                <td>{val.tipo_movimentacao}</td>
                                <td>{val.numconteiner_mov}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
                <thead>
                    <tr>
                        <th>Total de importações</th>
                        <th>Total de exportações</th>
                    </tr>
                </thead>

                <tbody>
                    {total.map((val) => (
                        <React.Fragment>
                            <tr>
                                <td>{val[0]}</td>
                                <td>{val[1]}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </>
    )
}