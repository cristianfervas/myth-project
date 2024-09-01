class UserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserError';
  }
}

class CreateUserError extends UserError {
  constructor(message) {
    super(message);
    this.name = 'CreateUserError';
  }
}

class UserNotFoundError extends UserError {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

module.exports = {
  UserError,
  CreateUserError,
  UserNotFoundError,
};
