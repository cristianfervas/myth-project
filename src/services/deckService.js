const { Deck, Card } = require('../models/associations');
const User = require('../models/User');

const createDeck = async (deckData) => {
  try {
    const {
      deck: { card_list_ids: cardListIds },
    } = deckData;
    const cards = await Card.findAll({
      where: {
        card_id: cardListIds,
      },
    });
    const newDeck = await Deck.create(deckData.deck);
    await newDeck.addCards(cards);
  } catch (error) {
    console.log('ERROR: ', error);
  }
};

const getDecksByUserName = async (userName) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: userName,
      },
    });
    if (userData) {
      return await Deck.findAll({
        where: {
          user_id: userData.user_id,
        },
      });
    }
  } catch (error) {
    console.log('ERROR: ', error);
  }
};

const getDeckByUserName = async (userName, deckId) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: userName,
      },
    });
    if (userData) {
      const deckWithCards = await Deck.findOne({
        where: { deck_id: deckId },
        include: {
          model: Card,
        },
      });
      return deckWithCards;
    }
  } catch (error) {
    console.log('ERROR: ', error);
  }
};

module.exports = {
  createDeck,
  getDecksByUserName,
  getDeckByUserName,
};
