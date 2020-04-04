const { celebrate, Segments, Joi } = require('celebrate');

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string()
      .required()
      .error(new Error('Insira um nome completo válido!')),
    city: Joi.string()
      .required()
      .error(new Error('Insira uma cidade válida!')),
    address: Joi.string()
      .required()
      .error(new Error('Insira um endereço válido!')),
    phone: Joi.string()
      .required()
      .error(new Error('Insira um telemóvel válido!')),
    identifiyer: Joi.string()
      .required()
      .error(new Error('Insira com número de identificação válido!'))
  })
});
