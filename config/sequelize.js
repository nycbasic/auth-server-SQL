const { Sequelize } = require("sequelize");
const server = new Sequelize(process.env.DB);

module.exports = server;
