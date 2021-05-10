"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class HistoricoCompeticoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }

  HistoricoCompeticoes.init(
    {
      competicao: DataTypes.STRING,
      participacoes: DataTypes.INTEGER,
      trofeus: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HistoricoCompeticoes",
    }
  );

  return HistoricoCompeticoes;
};
