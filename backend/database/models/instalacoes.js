'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  class Instalacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Instalacoes.init({
    departamento_medico: DataTypes.INTEGER,
    estadio_capacidade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Instalacoes',
  });
  return Instalacoes;
};