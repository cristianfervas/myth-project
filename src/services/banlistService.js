const Banlist = require('../models/Banlist');
const Card = require('../models/Card');
const Format = require('../models/Format');
const MYTH_SOURCE_API = require('../utilities/constants');
const {
  BanlistError,
  InvalidBanlistError,
  BanCardNotFoundError,
} = require('../exceptions/BanlistException');
const logger = require('../config/logger');

const isValidBanType = (incomingBanType) => {
  return MYTH_SOURCE_API.BANTYPES.some(
    (banType) => banType.id === incomingBanType,
  );
};

const createBanlist = async (banData) => {
  const {
    banlist: { format_id, ban_type, banned_card_ids },
  } = banData;

  if (!isValidBanType(ban_type)) {
    throw new InvalidBanlistError(`${ban_type} is not a valid restriction.`);
  }

  try {
    for (const ban_card_id of banned_card_ids) {
      const card = await Card.findByPk(ban_card_id);
      if (!card) {
        throw new BanCardNotFoundError(
          `Card with ID ${ban_card_id} does not exist.`,
        );
      }

      const banCard = {
        ban_type: ban_type,
        is_active: true,
        format_id: format_id,
        card_id: ban_card_id,
      };

      await Banlist.create(banCard);
    }

    return `Banlist created successfully with ${banned_card_ids.length} entries.`;
  } catch (error) {
    if (error instanceof BanlistError) {
      logger.error('Banlist-related error:', error.message);
    } else {
      logger.error('Unexpected error:', error);
    }
    throw error;
  }
};

const getAllBannedCardsByFormat = async (queryParams) => {
  const { format_id } = queryParams;
  try {
    const format = await Format.findByPk(format_id);
    if (!format) {
      throw new Error(`Format doesnt not exist.`);
    }
    const banList = await Banlist.findAll({
      where: {
        format_id: format_id,
      },
    });
    if (banList) {
      const banCards = [];
      for (const ban of banList) {
        const banCard = await Card.findByPk(ban.card_id);
        if (banCard) {
          banCard.dataValues.ban_type = ban.ban_type;
          banCards.push(banCard);
        }
      }
      return banCards;
    }
    return [];
  } catch (error) {
    logger.error('Error: ', error);
    throw error;
  }
};

module.exports = { createBanlist, getAllBannedCardsByFormat };
