const express = require('express');
const banlistService = require('../services/banlistService');
const banListSchema = require('./schemas/banlistSchema');

const router = express.Router();

router.post('/banlist/bannedCards', async (req, res) => {
  const { error, value: banlist } = banListSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const banList = await banlistService.createBanlist(banlist);
    res.status(201).json(banList);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error trying adding card to banlist: ${error}` });
  }
});

router.get('/banlist', async (req, res) => {
  if (Object.keys(req.query).length === 0) {
    return res.status(400).json({ error: `A search term must be provided` });
  }
  try {
    const bannedCards = await banlistService.getAllBannedCardsByFormat(
      req.query,
    );
    res.status(200).json(bannedCards);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error searching the banned cards. ${error}` });
  }
});

module.exports = router;
