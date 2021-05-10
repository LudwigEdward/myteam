const Jogadores = require("../../database/models/jogadores");
const Selecoes = require("../../database/models/selecoes");

const database = require("../database/config");

const JogadoresModel = Jogadores(database);
const SelecoesModel = Selecoes(database);

class JogadoresController {
  async read(req, res) {
    const jogadores = await JogadoresModel.findAll();

    return res.status(200).json({
      jogadores,
    });
  }

  async create(req, res) {
    try {
      const { nome, posicao } = req.body;
      if (!nome || !posicao) {
        return res.status(401).json({
          message:
            "Deve inserir todos os dados: nome, posição e codigo de seleção",
        });
      }

      const novoJogador = JogadoresModel.build({ nome, posicao });

      if (!novoJogador)
        return res
          .status(500)
          .json({ message: "Não foi possível criar um novo jogador." });

      novoJogador.save();

      return res.status(200).json({
        message: "Jogador criado com sucesso.",
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new JogadoresController(database);
