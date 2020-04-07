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
    const response = await DeliveryMan.getAllDeliveryGuys({});

    return res.status(response.statusCode).json(response);
  },
};
