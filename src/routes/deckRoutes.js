const express = require('express');
const { deckSchema, deckQuerySchema } = require('./schemas/deckSchema');
const deckService = require('../services/deckService');
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require('../utilities/responseHandler');

const router = express.Router();

router.post('/deck', async (req, res) => {
  const { error, value: deck } = deckSchema.validate(req.body);
  if (error) {
    return sendErrorResponse(res, error.details[0].message);
  }
  try {
    const deckCreated = await deckService.createDeck(deck);
    return sendSuccessResponse(res, deckCreated);
  } catch (error) {
    return sendErrorResponse(res, error.message, 500);
  }
});

router.get('/decks', async (req, res) => {
  const { error, value } = deckQuerySchema.validate(req.query);
  if (error) {
    return sendErrorResponse(res, error.details[0].message);
  }
  try {
    const { userName, page, pageSize } = value;
    const decks = await deckService.getDecksByUserName(
      userName,
      page,
      pageSize,
    );
    return sendSuccessResponse(res, decks);
  } catch (error) {
    return sendErrorResponse(res, error.message, 500);
  }
});

router.get('/deck/:deckId', async (req, res) => {
  const { userName } = req.query;
  if (!userName) {
    return sendErrorResponse(res, `A userName must be provided`, 400);
  }
  try {
    const deck = await deckService.getDeckByUserName(
      userName,
      req.params.deckId,
    );
    return sendSuccessResponse(res, deck);
  } catch (error) {
    return sendErrorResponse(res, error.message, 500);
  }
});

router.delete('/deck/:deckId', async (req, res) => {
  const { userName } = req.query;
  if (!userName) {
    return sendErrorResponse(res, `A userName must be provided`, 400);
  }
  try {
    const deck = await deckService.deleteDeckByUserName(
      userName,
      req.params.deckId,
    );
    return sendSuccessResponse(res, deck);
  } catch (error) {
    return sendErrorResponse(res, error.message, 500);
  }
});

module.exports = router;
