const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myth_service', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
