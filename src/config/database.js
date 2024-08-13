const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myth', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
