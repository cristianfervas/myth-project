const Joi = require('joi');

const deckSchema = Joi.object({
  deck: {
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
  },
}).required();

module.exports = deckSchema;
