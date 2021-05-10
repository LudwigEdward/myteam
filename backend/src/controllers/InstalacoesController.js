const Instalacoes = require('../../database/models/instalacoes');

const database = require("../database/config");

const InstalacoesModel = Instalacoes(database);

class InstalacoesController {
  async read(req, res) {
    const instalacoes = await InstalacoesModel.findAll();

    return res.status(200).json({
      instalacoes,
    })
  }

  async create(req, res) {
    try {
      const { departamento_medico, estadio_capacidade } = req.body;

      if (!departamento_medico || !estadio_capacidade) {
        return res.status(401).json({ message: 'Deve inserir todos os dados: quantidade de departamentos médicos e capacidade do estádio.' });
      }

      const novoInstalacao = InstalacoesModel.build(req.body);

      if (!novoInstalacao) return res.status(500).json({ message: 'Não foi possível criar uma nova instalação.' });

      novoInstalacao.save();

      return res.status(200).json({
        message: 'Instalação criada com sucesso'
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new InstalacoesController(database);