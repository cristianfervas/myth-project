const Card = require('./Card');
const Deck = require('./Deck');
const CardDeck = require('./CardDeck');

Card.belongsToMany(Deck, {
  through: CardDeck,
  foreignKey: 'card_id',
  otherKey: 'deck_id',
});

Deck.belongsToMany(Card, {
  through: CardDeck,
  foreignKey: 'deck_id',
  otherKey: 'card_id',
});

module.exports = { Card, Deck, CardDeck };
