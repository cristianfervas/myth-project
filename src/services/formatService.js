const Format = require('../models/Format');

async function createFormat(formatData) {
  try {
    const newFormat = await Format.create({
      format_id: formatData.id,
      name: formatData.name,
      name_slug: formatData.name_slug,
      description: formatData.description,
    });

    console.log('New format created:', newFormat);
  } catch (error) {
    console.error('Error trying create format:', error);
  }
}

module.exports = { createFormat };
