const Sequelize = require("sequelize");
const config = require('../../database/config/config')

const database = new Sequelize(config.development);

module.exports = database