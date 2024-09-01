const express = require('express');
const banlistService = require('../services/banlistService');
const banListSchema = require('./schemas/banlistSchema');
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require('../utilities/responseHandler');

const router = express.Router();

router.post('/banlist/bannedCards', async (req, res) => {
  const { error, value: banlist } = banListSchema.validate(req.body);
  if (error) {
    return sendErrorResponse(res, error.details[0].message);
  }
  try {
    const banList = await banlistService.createBanlist(banlist);
    return sendSuccessResponse(res, banList);
  } catch (error) {
    return sendErrorResponse(res, error, 500);
  }
});

router.get('/banlist', async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return sendErrorResponse(res, 'A search term must be provided');
  }
  try {
    const bannedCards = await banlistService.getAllBannedCardsByFormat(
      req.query,
    );
    return sendSuccessResponse(res, bannedCards);
  } catch (error) {
    return sendErrorResponse(res, error, 500);
  }
});

module.exports = router;
