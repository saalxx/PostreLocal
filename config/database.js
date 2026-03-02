const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postres_local",   // DB
  "root",            // user
  "root",            // password
  {
    host: "localhost", // Docker expone el puerto
    dialect: "mysql"
  }
);

module.exports = sequelize;