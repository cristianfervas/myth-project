'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('card_decks', {
      card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cards',
          key: 'card_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      deck_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'decks',
          key: 'deck_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('card_decks');
  },
};
