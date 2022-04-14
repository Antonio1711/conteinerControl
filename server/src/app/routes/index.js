const controller = require("../controller/index.js");
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors())

app.post('/registraConteiner',
    controller.registraConteiner
);

app.get('/conteiners',
    controller.getConteiners
);

app.get('/conteiners/:numConteiner', 
    controller.getConteinerByNum
);

app.delete('/deletaConteiner/:numConteiner',
    controller.deleteConteiner
)

app.put('/editaConteiner/:numConteiner',
    controller.editConteiner
)

app.post('/registraMovimento',
    controller.registraMovimento
)

app.get('/movimentacoes',
    controller.getMovimentos
)

app.delete('/deletaMovimento/:idMov',
    controller.deleteMovimento
)

app.get('/relatorioMov',
    controller.relatorioMov
)

app.get('/relatorioTotal',
    controller.relatorioTotal
)

module.exports = app;