const { Op } = require('sequelize');
const Card = require('../models/Card');

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
    });
    return cards;
  } catch (error) {
    console.error('Error fetching the cards', error);
    throw error;
  }
};

async function createCard(card) {
  try {
    const newCard = await Card.create(card);
    return newCard;
  } catch (error) {
    console.error(`Error trying to create card: ${card.name}`, error);
  }
}

module.exports = {
  searchCards,
  createCard,
};
