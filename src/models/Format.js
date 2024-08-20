const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Format = sequelize.define(
  'Format',
  {
    format_id: {
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
  },
  {
    tableName: 'formats',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = Format;
