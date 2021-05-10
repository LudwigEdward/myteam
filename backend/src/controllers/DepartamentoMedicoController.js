const DepartamentoMedico = require('../../database/models/departamentoMedico');
const Funcionarios = require('../../database/models/funcionarios');
const Jogadores = require('../../database/models/jogadores');

const database = require("../database/config");

const DepartamentoMedicoModel = DepartamentoMedico(database);
const JogadoresModel = Jogadores(database);
const FuncionariosModel = Funcionarios(database);

class DepartamentoMedicoController {
  async read(req, res) {
    const departamentoMedico = await DepartamentoMedicoModel.findOne({
      where: {
        id: 1,
      }
    });

    if (!departamentoMedico) {
      return res.status(404).json({
        message: 'Não existe departamento médico ainda'
      })
    }

    const jogadoresEncontrados = await JogadoresModel.findAll({
      where: {
        id: departamentoMedico.jogadores,
      }
    });

    const funcionariosDesignados = await FuncionariosModel.findAll({
      where: {
        id: departamentoMedico.funcionarios,
      }
    });

    return res.status(200).json({
      departamentoMedico: {
        jogadores: jogadoresEncontrados,
        funcionarios: funcionariosDesignados,
      },
    })
  }

  async create(req, res) {
    try {
      const { funcionarios, jogadores } = req.body;

      if (!funcionarios || !jogadores) {
        return res.status(401).json({ message: 'Deve inserir todos os dados: funcionarios e jogadores.' });
      }

      const jogadoresMachucados = await JogadoresModel.findAndCountAll({
        where: {
          id: jogadores,
        }
      });

      if (jogadoresMachucados.count !== jogadores.length) {
        return res.status(404).json({
          message: 'Um dos jogadores não existe.',
        });
      }

      const funcionariosResponsaveis = await FuncionariosModel.findAndCountAll({
        where: {
          id: funcionarios,
        }
      });

      if (funcionariosResponsaveis.count !== funcionarios.length) {
        return res.status(404).json({
          message: 'Um dos funcionários não existe.',
        });
      }

      const [novoDepartamento] = await DepartamentoMedicoModel.findOrBuild({
        where: {
          id: 1,
        },
        defaults: req.body,
      });

      if (!novoDepartamento) return res.status(500).json({ message: 'Não foi possível criar um novo departamento médico.' });

      await novoDepartamento.update(req.body);

      await novoDepartamento.save();

      return res.status(200).json({
        message: 'Departamento Médico criado com sucesso'
      });
    } catch (err) {
      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new DepartamentoMedicoController(database);