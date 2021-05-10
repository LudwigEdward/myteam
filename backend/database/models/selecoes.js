"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Selecoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Selecoes.init(
    {
      nome: DataTypes.STRING,
      jogadores: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Selecoes",
    }
  );

  return Selecoes;
};
