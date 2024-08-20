const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Banlist = sequelize.define(
  'Banlist',
  {
    banlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    format_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'formats',
        key: 'format_id',
      },
      allowNull: false,
    },
    card_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cards',
        key: 'card_id',
      },
      allowNull: false,
    },
    ban_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'banlists',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = Banlist;
