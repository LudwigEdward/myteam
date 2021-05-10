"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class JogadoresObservados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  JogadoresObservados.init(
    {
      jogador: DataTypes.INTEGER,
      funcionarios: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "JogadoresObservados",
    }
  );
  return JogadoresObservados;
};
