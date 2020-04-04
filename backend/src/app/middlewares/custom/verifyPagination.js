const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
  [Segments.QUERY]: {
    page: Joi.number(),
    items_page: Joi.number().error(
      new Error('Insira um total de registos válidos!')
    )
  }
});
