const res = require("express/lib/response");
const mysql = require("mysql");
const { response } = require("../routes");

// conexão com o banco de dados
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "conteiner_control",
});

module.exports = {
    registraConteiner: (req, res) => {
        const cliente = req.body.cliente;
        const numConteiner = req.body.num_conteiner;
        const tipoConteiner = req.body.tipo_conteiner;
        const status = req.body.status;
        const categoria = req.body.categoria;

        db.query("SELECT * FROM conteiner WHERE num_conteiner = ?", [numConteiner],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length == 0) {
                db.query(
                    "INSERT INTO conteiner (cliente, num_conteiner, tipo_conteiner, status, categoria) VALUES (?, ?, ?, ?, ?)",
                    [cliente, numConteiner, tipoConteiner, status, categoria],
                    (err, response) => {
                        if (err) {
                            res.send(err);
                        }

                        res.send({ msg: "Conteiner cadastrado com sucesso!" });
                        console.log(response)
                    }
                )
            } else {
                res.send({ msg: "Conteiner já cadastrado" })
            }
        })
    },

    getConteiners: (req, res) => {
        db.query(
            "SELECT * FROM conteiner", (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        )
    },

    getConteinerByNum: (req, res) => {
        const { numConteiner } = req.params;

        db.query("SELECT * FROM conteiner WHERE num_conteiner = ?", [numConteiner],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result)
            }
        }
    )
    },

    deleteConteiner: (req, res) => {
        const { numConteiner } = req.params;

        db.query("DELETE FROM conteiner WHERE num_conteiner = ?", [numConteiner],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                    console.log("Conteiner deletado!")
                }
            })
    },

    editConteiner: (req, res) => {
        const { numConteiner } = req.params;
        const cliente = req.body.cliente;
        const tipoConteiner = req.body.tipoConteiner;
        const status = req.body.status;
        const categoria = req.body.categoria;

        db.query(
            "UPDATE conteiner SET cliente = ?, tipo_conteiner = ?, status = ?, categoria = ? WHERE num_conteiner = ?", [cliente, tipoConteiner, status, categoria, numConteiner],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                    console.log("Conteiner atualizado com sucesso!")
                }
            }
        )
    },

    registraMovimento: (req, res) => {
        const tipoMovimentacao = req.body.tipo_movimentacao;
        const dataHoraInicio = req.body.dataHora_inicio;
        const dataHoraFim = req.body.dataHora_fim;
        const numConteinerMov = req.body.numConteiner_mov;

        db.query(
            "INSERT INTO movimentacoes (tipo_movimentacao, datahora_inicio, datahora_fim, numconteiner_mov) VALUES (?,?,?,?)",
            [tipoMovimentacao, dataHoraInicio, dataHoraFim, numConteinerMov],
            (err, response) => {
                if (err) {
                    res.send(err);
                }

                res.send({ msg: "Movimentação cadastrada com sucesso!" })
                console.log(response)
            }
        )
    },

    getMovimentos: (req, res) => {
        db.query(
            "SELECT * FROM movimentacoes", (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        )
    },

    deleteMovimento: (req, res) => {
        const { idMov } = req.params;

        db.query("DELETE FROM movimentacoes WHERE idMov = ?", [idMov],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log("movimento deletado!");
            }
        })
    },

    relatorioMov: (req, res) => {
        db.query(
            "SELECT conteiner.cliente, movimentacoes.tipo_movimentacao, numconteiner_mov FROM movimentacoes INNER JOIN conteiner ON numconteiner_mov = num_conteiner GROUP BY cliente, tipo_movimentacao", 
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        )
    },

    relatorioTotal: (req, res) => {
        db.query(
            "SELECT DISTINCT (SELECT COUNT(categoria) FROM conteiner WHERE categoria='importacao') AS 'Total de importações', (SELECT COUNT(categoria) FROM conteiner WHERE categoria='exportacao') AS 'Total de exportações' FROM conteiner",
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                    console.log(result)
                }
            }
        )
    }
}