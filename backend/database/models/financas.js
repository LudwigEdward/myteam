"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Financas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Financas.init(
    {
      lucro: DataTypes.DOUBLE,
      prejuizo: DataTypes.DOUBLE,
      saldo: DataTypes.DOUBLE,
      transferencias: DataTypes.DOUBLE,
      salarios_disponivel: DataTypes.DOUBLE,
      salarios_utilizado: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Financas",
    }
  );
  return Financas;
};