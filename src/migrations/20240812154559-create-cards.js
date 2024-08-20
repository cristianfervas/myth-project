'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cards', {
      card_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name_slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ability: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      strength: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type_slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rarity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rarity_slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_unique: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      race: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      race_slug: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      illustrator: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      edition_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'editions',
          key: 'edition_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('cards');
  },
};
