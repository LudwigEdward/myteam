"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Partidas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Partidas.init(
    {
      saldo_time: DataTypes.INTEGER,
      saldo_time_inimigo: DataTypes.INTEGER,
      jogadores_time: DataTypes.INTEGER,
      jogadores_time_inimigo: DataTypes.INTEGER,
      audiencia: DataTypes.INTEGER,
      valor_arrecadado: DataTypes.DOUBLE,
      data: DataTypes.DATE,
      estadio: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Partidas",
    }
  );
  return Partidas;
};
