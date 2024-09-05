const logger = require('../config/logger');
const Format = require('../models/Format');

async function createFormat(formatData) {
  try {
    const newFormat = await Format.create({
      format_id: formatData.id,
      name: formatData.name,
      name_slug: formatData.name_slug,
      description: formatData.description,
    });

    return newFormat;
  } catch (error) {
    logger.error('Error trying create format:', error);
  }
}

module.exports = { createFormat };
