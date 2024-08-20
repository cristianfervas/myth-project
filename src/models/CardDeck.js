const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CardDeck = sequelize.define(
  'CardDeck',
  {
    card_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cards',
        key: 'card_id',
      },
      allowNull: false,
    },
    deck_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'decks',
        key: 'deck_id',
      },
      allowNull: false,
    },
    copies: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'card_decks',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = CardDeck;
