const Funcionarios = require('../../database/models/funcionarios');

const database = require("../database/config");

const FuncionariosModel = Funcionarios(database);

class FuncionariosController {
  async read(req, res) {
    const funcionarios = await FuncionariosModel.findAll();

    return res.status(200).json({
      funcionarios,
    })
  }

  async create(req, res) {
    try {
      const { nome, funcao } = req.body;

      if (!nome || !funcao) {
        return res.status(401).json({ message: 'Deve inserir todos os dados: nome e função.' });
      }

      const novoFuncionario = FuncionariosModel.build(req.body);

      if (!novoFuncionario) return res.status(500).json({ message: 'Não foi possível criar um novo jogador.' });

      await novoFuncionario.save();

      return res.status(200).json({
        message: 'Funcionário criado com sucesso'
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new FuncionariosController(database);