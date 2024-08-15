const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Deck = sequelize.define(
  'Deck',
  {
    deck_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'decks',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = Deck;
