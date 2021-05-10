const Selecoes = require('../../database/models/selecoes');

const database = require("../database/config");

const SelecoesModel = Selecoes(database);

class SelecoesController {
  async read(req, res) {
    const selecoes = await SelecoesModel.findAll();

    return res.status(200).json({
      selecoes,
    })
  }

  async create(req, res) {
    try {
      const { jogadores, nome } = req.body;

      if (!jogadores || !nome) {
        return res.status(401).json({ message: 'Deve inserir todos os dados: jogadores e nome.' });
      }

      const novaSelecao = SelecoesModel.build(req.body);

      if (!novaSelecao) return res.status(500).json({ message: 'Não foi possível criar uma nova seleção.' });

      await novaSelecao.save();

      return res.status(200).json({
        message: 'Seleção criado com sucesso'
      });
    } catch (err) {
      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new SelecoesController(database);