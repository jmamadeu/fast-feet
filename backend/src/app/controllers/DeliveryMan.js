const DeliveryMan = require('../models/DeliveryMan');

module.exports = {
  async store(req, res) {
    const { name, email } = req.body;
    const { filename } = req.file;
    const resposne = await DeliveryMan.createDeliveryMan({
      name,
      avatar_id: filename,
      email,
    });

    return res.status(resposne.statusCode).json(resposne);
  },
};
