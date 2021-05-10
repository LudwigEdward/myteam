const HistoricoCompeticoes = require("../../database/models/historicoCompeticoes");

const database = require("../database/config");

const HistoricoCompeticoesModel = HistoricoCompeticoes(database);

class HistoricoCompeticoesController {
  async read(req, res) {
    const historicoCompeticoes = await HistoricoCompeticoesModel.findAll();

    return res.status(200).json({
      historicoCompeticoes,
    });
  }

  async create(req, res) {
    try {
      const { competicao, participacoes, trofeus } = req.body;

      if (!competicao || !participacoes || !trofeus) {
        return res
          .status(401)
          .json({
            message:
              "Deve inserir todos os dados: competição, participações e troféus.",
          });
      }

      const novoHistorico = HistoricoCompeticoesModel.build(req.body);

      if (!novoHistorico)
        return res
          .status(500)
          .json({ message: "Não foi possível criar um novo histórico." });

      await novoHistorico.save();

      return res.status(200).json({
        message: "Histórico criado com sucesso",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new HistoricoCompeticoesController(database);
