// src/services/userService.js
const User = require('../models/User');

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    console.log('ERROR: ', error);
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
