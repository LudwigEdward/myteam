const { Router } = require("express");

const FinancasController = require("./controllers/FinancasController");
const JogadoresController = require("./controllers/JogadoresController");
const FuncionariosController = require("./controllers/FuncionariosController");
const InstalacoesController = require("./controllers/InstalacoesController");
const PartidasController = require("./controllers/PartidasController");
const JogadoresObservadosController = require("./controllers/JogadoresObservadosController");
const HistoricoCompeticoesController = require("./controllers/HistoricoCompeticoesController");
const SelecoesController = require("./controllers/SelecoesController");
const DepartamentoMedicoController = require("./controllers/DepartamentoMedicoController");
const EstadioController = require("./controllers/EstadioController");

const routes = new Router();

routes.post("/financas", FinancasController.create);
routes.get("/financas", FinancasController.read);

routes.post("/jogadores", JogadoresController.create);
routes.get("/jogadores", JogadoresController.read);

routes.post("/funcionarios", FuncionariosController.create);
routes.get("/funcionarios", FuncionariosController.read);

routes.post("/instalacoes", InstalacoesController.create);
routes.get("/instalacoes", InstalacoesController.read);

routes.post("/partidas", PartidasController.create);
routes.get("/partidas", PartidasController.read);

routes.post("/jogadores-observados", JogadoresObservadosController.create);
routes.get("/jogadores-observados", JogadoresObservadosController.read);

routes.post("/historico-competicoes", HistoricoCompeticoesController.create);
routes.get("/historico-competicoes", HistoricoCompeticoesController.read);

routes.post("/selecoes", SelecoesController.create);
routes.get("/selecoes", SelecoesController.read);

routes.post("/departamento-medico", DepartamentoMedicoController.create);
routes.get("/departamento-medico", DepartamentoMedicoController.read);

routes.post("/estadio", EstadioController.create);
routes.get("/estadio", EstadioController.read);

module.exports = routes;
