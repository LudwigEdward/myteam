'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Estadio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Estadio.init({
    capacidade: DataTypes.INTEGER,
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Estadio',
  });
  return Estadio;
};