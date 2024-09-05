const Card = require('./Card');
const Deck = require('./Deck');
const CardDeck = require('./CardDeck');
const Edition = require('./Edition');
const Format = require('./Format');
const Banlist = require('./Banlist');
const User = require('./User');

User.hasMany(Deck, { foreignKey: 'user_id' });

Card.belongsTo(Edition, { foreignKey: 'edition_id' });
Card.belongsToMany(Deck, {
  through: CardDeck,
  foreignKey: 'card_id',
  otherKey: 'deck_id',
});

Deck.hasMany(Format, { foreignKey: 'format_id' });
Deck.belongsTo(User, { foreignKey: 'user_id' });
Deck.belongsToMany(Card, {
  as: 'cards',
  through: CardDeck,
  foreignKey: 'deck_id',
  otherKey: 'card_id',
});

Format.hasMany(Deck, { foreignKey: 'format_id' });
Format.hasMany(Banlist, { foreignKey: 'format_id' });

Banlist.belongsTo(Format, { foreignKey: 'format_id' });
Banlist.belongsTo(Card, { foreignKey: 'card_id' });

Edition.hasMany(Card, { foreignKey: 'edition_id' });

module.exports = { User, Card, Deck, CardDeck, Format, Banlist, Edition };
