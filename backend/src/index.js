// express
var express = require("express");
var FinancasController = require("./controllers/FinancasController");
var app = express();
var cors = require("cors");

const database = require("./database/config");
const routes = require("./routes");

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3000, async function () {
  await database.sync();

  console.log("App de Exemplo escutando na porta 3000!");
});
