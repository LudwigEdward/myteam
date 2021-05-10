"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class DepartamentoMedico extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }

  DepartamentoMedico.init(
    {
      funcionarios: DataTypes.INTEGER,
      jogadores: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DepartamentoMedico",
    }
  );

  return DepartamentoMedico;
};
