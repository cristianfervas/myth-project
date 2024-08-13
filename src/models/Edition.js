const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Edition = sequelize.define(
  'Edition',
  {
    id: {
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
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'editions',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

module.exports = Edition;
