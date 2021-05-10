"use strict";
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.sync({ alter: true, force: true });
};