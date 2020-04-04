const Recipient = require('../models/Recipients');

module.exports = {
  async store(req, res) {
    const response = await Recipient.createRecipient(req.body);

    return res.status(response.statusCode).json(response);
  },

  async delete(req, res) {
    const response = await Recipient.deleteRecipient(req.params.id);

    return res.status(response.statusCode).json(response);
  },

  async index(req, res) {
    const response = await Recipient.getAllRecipient();

    return res.status(response.statusCode).json(response);
  },

  async show(req, res) {
    const response = await Recipient.getOneRecipient(
      ['rec_id'],
      [req.params.id]
    );

    return res.status(response.statusCode).json(response);
  },

  async update(req, res) {
    const { id } = req.params;
    const response = await Recipient.updateRecipient({ id, ...req.body });

    return res.status(response.statusCode).json(response);
  }
};
