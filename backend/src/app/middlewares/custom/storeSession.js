const { celebrate, Joi, Segments } = require('celebrate');

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .error(new Error('Insira um endereço de email válido!')),
    password: Joi.required().error(new Error('A Palavra passe é obrigatória'))
  })
});
