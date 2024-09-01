const axios = require('axios');
const MYTH_SOURCE_API = require('../utilities/constants');
const editionService = require('../services/editionService');
const cardService = require('../services/cardService');
const logger = require('./config/logger');

async function retrieveCardData() {
  try {
    const requests = MYTH_SOURCE_API.PB_EDITIONS.map((edition_name) =>
      axios.get(`${MYTH_SOURCE_API.BASE_URL}/cards/edition/${edition_name}`),
    );
    const responses = await Promise.all(requests);
    responses.forEach(async (response) => {
      if (response.status === 200 && response?.data?.edition) {
        const { edition } = response.data;
        const { cards } = response.data;
        generateFeedToCards(cards, edition);
      }
    });
  } catch (error) {
    logger.error('Error fetching data:', error);
  }
}

const generateFeedToCards = (cards, edition) => {
  const cardsToInsert = [];
  const cardsWithError = [];
  cards.forEach((card) => {
    const race = MYTH_SOURCE_API.CARD_RACES.find(
      (race) => race.id === parseInt(card.race),
    );
    const rarity = MYTH_SOURCE_API.CARD_RARITIES.find(
      (rarity) => rarity.id === parseInt(card.rarity),
    );
    const type = MYTH_SOURCE_API.CARD_TYPES.find(
      (type) => type.id === parseInt(card.type),
    );
    try {
      const cardToInsert = {
        card_id: parseInt(card.id),
        name: card.name,
        name_slug: card.slug,
        description: card.flavour,
        ability: card.ability,
        cost: card.cost,
        strength: type.slug == 'aliado' ? card.damage : '',
        type: type.name,
        type_slug: type.slug,
        rarity: rarity.name,
        rarity_slug: rarity.slug,
        race: race?.name,
        race_slug: race?.slug,
        image_url: `${MYTH_SOURCE_API.BASE_URL}/static/cards/${edition.id}/${card.edid}.png`,
        illustrator: '',
        is_unique: false,
        edition_id: parseInt(card.ed_edid),
      };
      cardsToInsert.push(cardToInsert);
    } catch (error) {
      cardsWithError.push({
        error: error,
        card: card,
      });
    }
  });
  console.log(
    `Cards of the edition: ${edition.title} with errors: `,
    cardsWithError,
  );
  cardsToInsert.forEach(async (card) => {
    try {
      await cardService.createCard(card);
    } catch (error) {
      logger.error(error);
    }
  });
};

retrieveCardData();
