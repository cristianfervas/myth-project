const express = require('express');
const router = express.Router();
const cardService = require('../services/cardService');
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../utilities/responseHandler');

router.get('/cards/search', async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return sendErrorResponse(res, `A search term must be provided`, 400);
  }
  try {
    const cards = await cardService.searchCards(req.query);
    return sendSuccessResponse(res, cards);
  } catch (error) {
    return sendErrorResponse(res, error.message, 500);
  }
});

module.exports = router;
