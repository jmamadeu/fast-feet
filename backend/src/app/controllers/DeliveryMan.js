const DeliveryMan = require('../models/DeliveryMan');

module.exports = {
  async store(req, res) {
    const { name, email } = req.body;
    const { filename } = req.file;
    const response = await DeliveryMan.createDeliveryMan({
      name,
      avatar_id: filename,
      email,
    });

    return res.status(response.statusCode).json(response);
  },

  async index(req, res) {
    const { page = 1, items_page = 5 } = req.query;
    const response = await DeliveryMan.getAllDeliveryGuys({ page, items_page });

    return res.status(response.statusCode).json(response);
  },

  async update(req, res) {
    const avatar_id = req.file.filename;

    const response = await DeliveryMan.updateDeliveryMan({
      ...req.body,
      avatar_id,
      ...req.params,
    });

    return res.status(response.statusCode).json(response);
  },

  async delete(req, res) {
    const response = await DeliveryMan.deleteDelivery(req.params.id);

    return res.status(response.statusCode).json(response);
  },

  async show(req, res) {
    const response = await DeliveryMan.getOneDeliveryMan(
      ['del_id'],
      [req.params.id]
    );

    return res.status(response.statusCode).json(response);
  },
};
