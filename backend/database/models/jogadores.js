"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Jogadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Jogadores.init(
    {
      nome: DataTypes.STRING,
      posicao: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Jogadores",
    }
  );
  return Jogadores;
};
