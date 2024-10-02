const { Op } = require('sequelize');
const Card = require('../models/Card');
const { Edition } = require('../models/associations');
const logger = require('../config/logger');

const searchCards = async (query) => {
  const { name, race, type, rarity } = query;
  if (!name && !race && !type && !rarity) {
    return [];
  }
  const whereClause = {};
  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }
  if (race) {
    whereClause.race_slug = { [Op.iLike]: `${race}` };
  }
  if (type) {
    whereClause.type_slug = { [Op.iLike]: `${type}` };
  }
  if (rarity) {
    whereClause.rarity_slug = { [Op.iLike]: `${rarity}` };
  }
  try {
    const cards = await Card.findAll({
      where: whereClause,
      include: {
        model: Edition,
        as: 'edition',
      },
    });
    return cards;
  } catch (error) {
    logger.error('Error fetching the cards', error);
    throw error;
  }
};

async function createCard(card) {
  try {
    const newCard = await Card.create(card);
    return newCard;
  } catch (error) {
    logger.error(`Error trying to create card: ${card.name}`, error);
  }
}

module.exports = {
  searchCards,
  createCard,
};
