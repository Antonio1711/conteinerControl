const express = require('express');
const app = express();

const cors = require("cors");

const routes = require("./app/routes/index.js");

app.use(express.json());
app.use(cors());
app.use(routes);
  

app.listen(3002, () => {
    console.log("Rodando na porta 3002");
});