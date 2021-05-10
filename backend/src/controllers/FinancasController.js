const Financas = require('../../database/models/financas');

const database = require("../database/config");

const FinancasModel = Financas(database);

class FinancasController {
  async read(req, res) {
    const financas = await FinancasModel.findAll();

    return res.status(200).json({
      financas,
    })
  }

  async create(req, res) {
    try {
      const novasFinancas = await FinancasModel.build(req.body);

      await novasFinancas.save();

      return res.status(200).json({
        message: 'Finanças criadas com sucesso'
      });
    } catch (err) {
      console.log(err)

      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new FinancasController(database);