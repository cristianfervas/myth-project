const Joi = require('joi');

const banListSchema = Joi.object({
  banlist: Joi.object({
    format_id: Joi.number().required(),
    ban_type: Joi.string().required(),
    banned_card_ids: Joi.array().items(Joi.number().required()).required(),
  }).required(),
}).required();

module.exports = banListSchema;
