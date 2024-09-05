const logger = require('../config/logger');
const Edition = require('../models/Edition');

async function createEdition(editionData) {
  try {
    const newEdition = await Edition.create({
      edition_id: parseInt(editionData.id, 10),
      name: editionData.title,
      name_slug: editionData.slug,
      image_url: editionData.image,
    });

    return newEdition;
  } catch (error) {
    logger.error('Error trying create edition:', error);
  }
}

module.exports = { createEdition };
