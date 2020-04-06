const Recipient = require('../models/Recipient');
const returnMessages = require('../utils/returnMessages');

module.exports = {
  async verifyIdBeforeCreate(req, res, next) {
    const { identifiyer } = req.body;
    const response = await Recipient.getOneRecipient(
      ['rec_identifiyer'],
      [identifiyer]
    );

    if (response.data) {
      const response = returnMessages.alreadExists({
        message: 'O Destinatário, já existe!',
        data: req.body,
      });

      return res.status(response.statusCode).json(response);
    }

    next();
  },
  async verifyExists(req, res, next) {
    const { id } = req.params;
    const response = await Recipient.getOneRecipient(['rec_id'], [id]);

    if (!response.data) {
      const response = returnMessages.notFound({
        message: 'O Destinatário não existe!',
      });

      return res.status(response.statusCode).json(response);
    }

    next();
  },

  async verifyBeforeUpdate(req, res, next) {
    const { identifiyer } = req.body;
    const response = await Recipient.getOneRecipient(
      ['rec_identifiyer'],
      [identifiyer]
    );

    if (response.data && response.data.rec_id !== req.params.id) {
      const response = returnMessages.alreadExists({
        message: 'Já existe um destinatário com esta identificação!',
      });

      return res.status(response.statusCode).json(response);
    }

    next();
  },
};
