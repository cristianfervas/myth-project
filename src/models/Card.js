const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

Card.belongsToMany(Deck, {
  through: CardDeck,
  foreignKey: 'card_id',
  otherKey: 'deck_id',
});

const Card = sequelize.define(
  'Card',
  {
    card_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ability: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    strength: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rarity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rarity_slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    race_slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    illustrator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    edition_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'cards',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = Card;
