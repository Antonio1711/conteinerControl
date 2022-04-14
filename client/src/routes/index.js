import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddConteiner from "../pages/addConteiner";
import AddMov from "../pages/addMov";
import Conteiners from "../pages/conteiners";
import EditConteiner from "../pages/editConteiner";
import Movimentacoes from "../pages/movimentacoes";
import Relatorios from "../pages/relatorios";

export default function Rotas() {
    return(
        <>
            <Router>
                <Routes>
                    <Route path='/' exact element={<Conteiners/>} />
                    <Route path='/movimentacoes' exact element={<Movimentacoes/>} />
                    <Route path='/relatorio' exact element={<Relatorios/>} />
                    <Route path='/addConteiner' exact element={<AddConteiner />} />
                    <Route path='/addMov' exact element={<AddMov />} />
                    <Route path='/editConteiner/:num_conteiner' exact element={<EditConteiner />} />
                </Routes>
            </Router>
        </>
    )
}