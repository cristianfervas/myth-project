const express = require('express');
const router = express.Router();
const cardService = require('../services/cardService');

router.get('/cards/search', async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json({ error: `A search term must be provided` });
  }
  try {
    const cards = await cardService.searchCards(req.query);
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Error searching the cards.' });
  }
});

module.exports = router;
