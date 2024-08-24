class DeckError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DeckError';
  }
}

class CardBanRestrictionError extends DeckError {
  constructor(message) {
    super(message);
    this.name = 'CardBanRestrictionError';
  }
}

class CardMaxSpecificCopiesRestriction extends DeckError {
  constructor(message) {
    super(message);
    this.name = 'CardMaxSpecificCopiesRestriction';
  }
}

class CardMinSpecificCopiesRestriction extends DeckError {
  constructor(message) {
    super(message);
    this.name = 'CardMinSpecificCopiesRestriction';
  }
}

class CardUniqueCopiesRestriction extends DeckError {
  constructor(message) {
    super(message);
    this.name = 'CardUniqueCopiesRestriction';
  }
}

class TotalCardCopiesInDeckRestriction extends DeckError {
  constructor(message) {
    super(message);
    this.name = 'TotalCardCopiesInDeckRestriction';
  }
}

module.exports = {
  DeckError,
  CardBanRestrictionError,
  CardMaxSpecificCopiesRestriction,
  CardMinSpecificCopiesRestriction,
  CardUniqueCopiesRestriction,
  TotalCardCopiesInDeckRestriction,
};
