const Joi = require('joi');

const userSchema = Joi.object({
  user: {
    user_name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    name: Joi.string().min(3).max(30).required(),
    last_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30).required(),
  },
}).required();

module.exports = userSchema;
