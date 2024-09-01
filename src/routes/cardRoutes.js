const express = require('express');
const router = express.Router();
const cardService = require('../services/cardService');
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../utilities/responseHandler');

router.get('/cards/search', async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json({ error: `A search term must be provided` });
  }
  try {
    const cards = await cardService.searchCards(req.query);
    return sendSuccessResponse(res, cards);
  } catch (error) {
    return sendErrorResponse(res, error, 500);
  }
});

module.exports = router;
