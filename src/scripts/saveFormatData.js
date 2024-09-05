const logger = require('../config/logger');
const formatService = require('../services/formatService');

const MYTH_SOURCE_API = require('../utilities/constants');

const saveFormatData = () => {
  const formatInfo = MYTH_SOURCE_API.FORMAT_GAMES;
  try {
    formatInfo.forEach(async (format) => {
      await formatService.createFormat(format);
    });
  } catch (error) {
    logger.error('Error saving format', error);
  }
};

saveFormatData();
