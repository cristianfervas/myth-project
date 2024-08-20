const Edition = require('../models/Edition');

async function createEdition(editionData) {
  try {
    const newEdition = await Edition.create({
      edition_id: parseInt(editionData.id, 10),
      name: editionData.title,
      name_slug: editionData.slug,
      image_url: editionData.image,
    });

    console.log('New edition created:', newEdition);
  } catch (error) {
    console.error('Error trying create edition:', error);
  }
}

module.exports = { createEdition };
