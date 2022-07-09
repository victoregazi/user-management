const Sequelize = require("sequelize");

module.exports = new Sequelize('management', 'postgres', '1986', {
    host: 'localhost',
    dialect: 'postgres',
});