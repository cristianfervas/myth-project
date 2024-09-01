class BanlistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BanlistError';
  }
}

class InvalidBanlistError extends BanlistError {
  constructor(message) {
    super(message);
    this.name = 'InvalidBanlistError';
  }
}

class BanCardNotFoundError extends BanlistError {
  constructor(message) {
    super(message);
    this.name = 'BanCardNotFoundError';
  }
}

module.exports = {
  BanlistError,
  InvalidBanlistError,
  BanCardNotFoundError,
};
