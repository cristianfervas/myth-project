const express = require('express');
const deckSchema = require('./schemas/deckSchema');
const deckService = require('../services/deckService');

const router = express.Router();

router.post('/deck', async (req, res) => {
  const { error, value: deck } = deckSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const deckCreated = await deckService.createDeck(deck);
    res.status(201).json(deckCreated);
  } catch (error) {
    res.status(500).json({ error: `Error creating deck: ${error}` });
  }
});

router.get('/decks', async (req, res) => {
  const { userName } = req.query;
  try {
    const decks = await deckService.getDecksByUserName(userName);
    res.status(201).json(decks);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al obtener decks del usuario: ${userName}` });
  }
});

router.get('/deck/:deckId', async (req, res) => {
  const { userName } = req.query;
  try {
    const decks = await deckService.getDeckByUserName(
      userName,
      req.params.deckId,
    );
    res.status(201).json(decks);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al obtener deck del usuario: ${userName}` });
  }
});

module.exports = router;
