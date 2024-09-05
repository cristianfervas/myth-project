const { Deck, Card } = require('../models/associations');
const User = require('../models/User');
const Banlist = require('../models/Banlist');
const { MYTH_SOURCE_API } = require('../utilities/constants');
const {
  DeckError,
  CardBanRestrictionError,
  CardMaxSpecificCopiesRestriction,
  CardMinSpecificCopiesRestriction,
  CardUniqueCopiesRestriction,
  TotalCardCopiesInDeckRestriction,
} = require('../exceptions/DeckError');
const { UserNotFoundError } = require('../exceptions/UserError');
const logger = require('../config/logger');
const {
  setOffset,
  generatePaginatedFormat,
} = require('../utilities/pagination');

const getBannedCards = async (format_id) => {
  const formatBanlist = await Banlist.findAll({
    where: {
      format_id: format_id,
    },
  });
  return formatBanlist.reduce((acc, ban) => {
    acc[ban.card_id] = ban.ban_type;
    return acc;
  }, {});
};

const checkBanRestrictions = (bannedCards, card, copies) => {
  if (bannedCards[card.card_id]) {
    const restrictionType = bannedCards[card.card_id];
    const banType = MYTH_SOURCE_API.BANTYPES.find(
      (type) => type.id === restrictionType,
    );

    if (banType && copies > banType.restricted_to) {
      throw new CardBanRestrictionError(
        `Card: ${card.name} exceeds the allowed copies (${banType.restricted_to}).`,
      );
    }
  }
};

const checkCardCopiesLimit = (card, copies) => {
  if (copies <= 0) {
    throw new CardMinSpecificCopiesRestriction(
      `${card.name} have invalid copies: ${copies}.`,
    );
  }
  if (copies > 3) {
    throw new CardMaxSpecificCopiesRestriction(
      `${card.name} have more than 3 copies, ${copies} copies received.`,
    );
  }
  if (card.is_unique && copies > 1) {
    throw new CardUniqueCopiesRestriction(
      `${card.name} is unique so can't have multiple copies, ${copies} copies received.`,
    );
  }
};

const checkTotalCardsInDeck = (totalCards) => {
  if (totalCards > MYTH_SOURCE_API.DECK_CARD_LIMIT) {
    throw new TotalCardCopiesInDeckRestriction(
      `Total number of cards: ${totalCards} in the deck exceeds the allowed limit of ${MYTH_SOURCE_API.DECK_CARD_LIMIT}.`,
    );
  }
  if (totalCards < MYTH_SOURCE_API.DECK_CARD_LIMIT) {
    throw new TotalCardCopiesInDeckRestriction(
      `Total number of cards: ${totalCards}  in the deck is under the value of ${MYTH_SOURCE_API.DECK_CARD_LIMIT}.`,
    );
  }
};

const createDeck = async (deckData) => {
  const cardsToAdd = [];
  let totalCards = 0;
  const {
    deck: { card_list_ids: cardListIds, format_id },
  } = deckData;
  try {
    const bannedCards = await getBannedCards(format_id);
    for (const cardData of cardListIds) {
      const { card_id, copies } = cardData;
      const card = await Card.findByPk(card_id);
      if (card) {
        checkBanRestrictions(bannedCards, card, copies);
        checkCardCopiesLimit(card, copies);
        totalCards += copies;
        cardsToAdd.push({ card, copies });
      }
    }
    checkTotalCardsInDeck(totalCards);
    const newDeck = await Deck.create(deckData.deck);
    for (const cardToAdd of cardsToAdd) {
      const { card, copies } = cardToAdd;
      await newDeck.addCard(card, { through: { copies } });
    }
    return newDeck;
  } catch (error) {
    if (error instanceof DeckError) {
      logger.error('Deck-related error:', error.message);
    } else {
      logger.error('Unexpected error:', error.message);
    }
    throw error;
  }
};

const getDecksByUserName = async (userName, page, pageSize) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: userName,
      },
    });
    if (userData) {
      const offset = setOffset(page, pageSize);
      const totalDecks = await Deck.count({
        where: {
          user_id: userData.user_id,
        },
      });
      const decks = await Deck.findAll({
        where: {
          user_id: userData.user_id,
        },
        limit: pageSize,
        offset: offset,
      });
      return generatePaginatedFormat(decks, page, totalDecks, pageSize);
    }
    return generatePaginatedFormat([], 1, 0, pageSize);
  } catch (error) {
    logger.error('ERROR: ', error);
  }
};

const getDeckByUserName = async (userName, deckId) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: userName,
      },
    });
    if (!userData) {
      throw new UserNotFoundError('User not found');
    }
    const deckWithCards = await Deck.findOne({
      where: { deck_id: deckId },
      include: {
        model: Card,
        as: 'cards',
      },
    });
    return deckWithCards;
  } catch (error) {
    logger.error('ERROR: ', error);
  }
};

const deleteDeckByUserName = async (userName, deckId) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: userName,
      },
    });
    if (!userData) {
      throw new UserNotFoundError('User not found');
    }
    const deckWithCards = await Deck.findOne({
      where: { deck_id: deckId },
      include: {
        model: Card,
      },
    });
    await deckWithCards.destroy();
    return { message: 'Deck successfully deleted' };
  } catch (error) {
    logger.error('ERROR: ', error);
  }
};

module.exports = {
  createDeck,
  getDecksByUserName,
  getDeckByUserName,
  deleteDeckByUserName,
};
