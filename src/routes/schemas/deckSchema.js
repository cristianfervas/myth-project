const Joi = require('joi');
const { PAGINATION } = require('../../utilities/constants');

const deckSchema = Joi.object({
  deck: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    image_url: Joi.string().uri().optional(),
    race: Joi.string().optional(),
    user_id: Joi.number().required(),
    format_id: Joi.number().required(),
    card_list_ids: Joi.array()
      .items(
        Joi.object({
          card_id: Joi.number().required(),
          copies: Joi.number().required(),
        }),
      )
      .required(),
  }).required(),
}).required();

const deckQuerySchema = Joi.object({
  userName: Joi.string().required(),
  page: Joi.number().integer().min(1).default(PAGINATION.PAGE_DEFAULT),
  pageSize: Joi.number().integer().min(1).default(PAGINATION.LIMIT_DEFAULT),
});

module.exports = { deckSchema, deckQuerySchema };
