const Card = require('../models/Card');
const { Op } = require('sequelize');

const checkIfCardIsUnique = async () => {
  const uniqueCards = await Card.findAll({
    where: {
      ability: { [Op.iLike]: `%carta única%` },
    },
  });
  return uniqueCards;
};

const updateUniqueCardAttribute = async () => {
  const cardToUpdate = await checkIfCardIsUnique();
  cardToUpdate.forEach(async (card) => {
    await Card.update(
      { is_unique: true },
      { where: { card_id: card.card_id } },
    );
  });
};

updateUniqueCardAttribute();
