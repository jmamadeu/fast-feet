const DeliveryMan = require('../models/DeliveryMan');
const { celebrate, Segments, Joi } = require('celebrate');
const fs = require('fs');
const path = require('path');

const returnMessages = require('../utils/returnMessages');

module.exports = {
  async verifyData(req, res, next) {
    const { name, email } = req.body;

    if (typeof name !== 'string' || name.toString().length < 3) {
      const response = returnMessages.unknownError({
        message: 'Insira um nome válido!',
      });

      return res.status(response.statusCode).json(response);
    }

    if (
      typeof email !== 'string' ||
      !email.toString().includes('@') ||
      !email.toString().includes('.')
    ) {
      const response = returnMessages.unknownError({
        message: 'Insira um email válido!',
      });

      return res.status(response.statusCode).json(response);
    }

    next();
  },

  async verifyIdBeforeInsert(req, res, next) {
    const { email } = req.body;
    const response = await DeliveryMan.getOneDeliveryMan(
      ['del_email'],
      [email]
    );

    if (response.data) {
      const response = returnMessages.alreadExists({
        message: 'O entregador já existe!',
      });

      const file = req.file.filename;

      fs.unlinkSync(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'uploads',
          'avatars',
          `${file}`
        )
      );

      return res.status(response.statusCode).json(response);
    }

    next();
  },
};
