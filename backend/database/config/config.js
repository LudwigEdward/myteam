require("dotenv").config();
const { DB_IP, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;
module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_IP,
    port: DB_PORT,
    database: "postgres",
    dialect: "postgres",
  },
};
