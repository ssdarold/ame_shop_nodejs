const mysql = require("mysql2")
const Sequelize = require("sequelize")

const sequelize_connection = new Sequelize("ame_to_amejusto", "root", "root", {
    dialect: "mysql",
    host: "127.0.0.1",
    port: "3306"
  })

module.exports = sequelize_connection