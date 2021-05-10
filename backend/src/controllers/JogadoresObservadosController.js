const Funcionarios = require("../../database/models/funcionarios");
const Jogadores = require("../../database/models/jogadores");
const JogadoresObservados = require("../../database/models/jogadoresObservados");

const database = require("../database/config");

const JogadoresObservadosModel = JogadoresObservados(database);
const JogadoresModel = Jogadores(database);
const FuncionariosModel = Funcionarios(database);

class JogadoresObservadosController {
  async read(req, res) {
    const jogadoresObservados = await JogadoresObservadosModel.findAll();

    const jogadores = [];
    const funcionarios = [];

    let promises = [];

    promises = jogadoresObservados.map(async (item) => {
      const jogador = await JogadoresModel.findOne({
        where: {
          id: item.jogador,
        },
      });

      jogadores.push(jogador);

      const funcionariosDesignados = await FuncionariosModel.findAll({
        where: {
          id: item.funcionarios,
        },
      });

      funcionarios.push({
        id: item.id,
        funcionarios: funcionariosDesignados,
      });
    });

    await Promise.all(promises);

    return res.status(200).json({
      observacoes: jogadoresObservados.map((item) => ({
        jogador: jogadores.find((j) => j.id === item.jogador),
        funcionarios: funcionarios.find((f) => f.id === item.id).funcionarios,
      })),
    });
  }

  async create(req, res) {
    try {
      const { jogador, funcionarios } = req.body;

      if (!jogador || !funcionarios) {
        return res.status(401).json({
          message: "Deve inserir todos os dados: jogador e funcionários.",
        });
      }

      const jogadorObservado = await JogadoresModel.findOne({
        where: {
          id: jogador,
        },
      });

      if (!jogadorObservado) {
        return res.status(404).json({
          message: "Jogador não encontrado",
        });
      }

      const funcionariosResponsaveis = await FuncionariosModel.findAndCountAll({
        where: {
          id: funcionarios,
        },
      });

      if (funcionariosResponsaveis.count !== funcionarios.length) {
        console.log(funcionariosResponsaveis.count, funcionarios.length);
        return res.status(404).json({
          message: "Um dos funcionários não existe.",
        });
      }

      const novoJogadorObservado = JogadoresObservadosModel.build({
        jogador,
        funcionarios,
      });

      if (!novoJogadorObservado)
        return res.status(500).json({
          message: "Não foi possível criar um novo jogador observado.",
        });

      await novoJogadorObservado.save();

      return res.status(200).json({
        message: "Jogador observado criado com sucesso.",
      });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new JogadoresObservadosController(database);
