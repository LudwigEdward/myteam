const Estadio = require("../../database/models/estadio");
const Partidas = require("../../database/models/partidas");
const Jogadores = require("../../database/models/jogadores");

const database = require("../database/config");

const PartidasModel = Partidas(database);
const EstadioModel = Estadio(database);
const JogadoresModel = Jogadores(database);

class PartidasController {
  async read(req, res) {
    const partidas = await PartidasModel.findAll();

    const estadios = [];
    const jogadores = [];
    const jogadoresInimigo = [];

    // console.log(partidas)

    let promises = [];

    promises = partidas.map(async (item) => {
      console.log(item.getDataValue("id"));

      const estadio = await EstadioModel.findOne({
        where: {
          id: item.estadio,
        },
      });

      estadios.push({
        id: estadio.id,
        nome: estadio.nome,
        capacidade: estadio.capacidade,
      });

      const jogadoresTime = await JogadoresModel.findOne({
        where: {
          id: item.jogadores_time,
        },
      });

      jogadores.push({
        id: item.getDataValue("id"),
        jogadoresTime,
      });

      const jogadoresTimeInimigo = await JogadoresModel.findAll({
        where: {
          id: item.jogadores_time_inimigo,
        },
      });

      jogadoresInimigo.push({
        id: item.getDataValue("id"),
        jogadoresTimeInimigo,
      });
    });

    await Promise.all(promises);

    return res.status(200).json({
      partidas: partidas.map(
        ({
          id,
          saldo_time,
          saldo_time_inimigo,
          jogadores_time_inimigo,
          jogadores_time,
          audiencia,
          valor_arrecadado,
          data,
          estadio,
        }) => ({
          id,
          saldo_time,
          saldo_time_inimigo,
          jogadores_time: jogadores.find((f) => f.id === id).jogadoresTime,
          jogadores_time_inimigo: jogadoresInimigo.find((f) => f.id === id)
            .jogadoresTimeInimigo,
          audiencia,
          valor_arrecadado,
          data: "2021-05-09T14:21:25.264Z",
          estadio: estadios.find((estad) => estad.id === estadio),
        })
      ),
    });
  }

  async create(req, res) {
    try {
      const {
        saldo_time,
        saldo_time_inimigo,
        jogadores_time,
        jogadores_time_inimigo,
        audiencia,
        valor_arrecadado,
        estadio,
        data,
      } = req.body;
      if (
        !saldo_time ||
        !saldo_time_inimigo ||
        !jogadores_time ||
        !jogadores_time_inimigo ||
        !audiencia ||
        !valor_arrecadado ||
        !estadio ||
        !data
      ) {
        return res.status(400).json({
          message:
            "Deve inserir todos os dados: saldo do time, saldo do time inimigo, jogadores do time, jogadores do time inimigo, audiencia, estadio, data e valor arrecadado.",
        });
      }

      const estadioVinculado = await EstadioModel.findOne({
        where: {
          id: estadio,
        },
      });

      if (!estadioVinculado) {
        return res.status(404).json({
          message: "Estádio não encontrado.",
        });
      }

      const novaPartida = PartidasModel.build({
        saldo_time,
        saldo_time_inimigo,
        jogadores_time,
        jogadores_time_inimigo,
        audiencia,
        valor_arrecadado,
        estadio,
        data,
      });

      if (!novaPartida)
        return res
          .status(500)
          .json({ message: "Não foi possível adicionar uma nova partida." });

      await novaPartida.save();

      return res.status(200).json({
        message: "Partida criada com sucesso",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ erro: true });
    }
  }
}

module.exports = new PartidasController(database);
