const express = require('express');
const userService = require('../services/userService');
const userSchema = require('./schemas/userSchema');
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require('../utilities/responseHandler');

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    const { error, value: incomingUser } = userSchema.validate(req.body);
    if (error) {
      return sendErrorResponse(res, error.details[0].message);
    }
    const user = await userService.createUser(incomingUser);
    return sendSuccessResponse(res, user);
  } catch (error) {
    return sendErrorResponse(res, error, 500);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return sendSuccessResponse(res, users);
  } catch (error) {
    return sendErrorResponse(res, error, 500);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      return sendSuccessResponse(res, user);
    } else {
      return sendErrorResponse(res, error.details[0].message, 404);
    }
  } catch (error) {
    return sendErrorResponse(res, error, 500);
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      return sendSuccessResponse(res, user);
    } else {
      return sendErrorResponse(res, error.details[0].message, 404);
    }
  } catch (error) {
    return sendErrorResponse(res, error, 500);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const success = await userService.deleteUser(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      return sendErrorResponse(res, error.details[0].message, 404);
    }
  } catch (error) {
    return sendErrorResponse(res, error, 500);
  }
});

module.exports = router;
