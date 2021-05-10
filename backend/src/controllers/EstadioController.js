const Estadio = require('../../database/models/estadio');

const database = require("../database/config");

const EstadioModel = Estadio(database);

class EstadioController {
  async read(req, res) {
    const estadio = await EstadioModel.findAll();

    return res.status(200).json({
      estadio,
    })
  }

  async create(req, res) {
    try {
      const {
        nome,
        capacidade
      } = req.body;

      if (!nome || !capacidade) {
        return res.status(401).json({ message: 'Deve inserir todos os dados: nome e capacidade.' });
      }

      const novoEstadio = EstadioModel.build(req.body);

      if (!novoEstadio) return res.status(500).json({ message: 'Não foi possível criar um novo estádio.' });

      await novoEstadio.save();

      return res.status(200).json({
        message: 'Estádio criado com sucesso'
      });
    } catch (err) {
      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new EstadioController(database);