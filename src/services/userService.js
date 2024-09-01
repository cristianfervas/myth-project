const bcrypt = require('bcrypt');
const User = require('../models/User');
const { CreateUserError } = require('../exceptions/UserError');

const createUser = async (userData) => {
  try {
    const {
      user: { user_name, password, name, last_name, email },
    } = userData;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      user_name,
      password_hash,
      salt,
      name,
      last_name,
      email,
      is_active: true,
      is_email_verified: false,
      failed_login_attempts: 0,
      last_login: null,
      password_reset_token: null,
      password_reset_token_expires: null,
      block_account_time: null,
    });

    return newUser;
  } catch (error) {
    throw new CreateUserError('Error creating user');
  }
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (user) {
    return await user.update(userData);
  }
  return null;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
