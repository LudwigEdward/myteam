"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }

  Time.init(
    {
      funcionarios: DataTypes.INTEGER,
      jogadores: DataTypes.INTEGER,
      financas: DataTypes.INTEGER,
      partidas: DataTypes.INTEGER,
      instalacoes: DataTypes.INTEGER,
      jogadores_observados: DataTypes.INTEGER,
      historico_competicoes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Time",
    }
  );

  return Time;
};
