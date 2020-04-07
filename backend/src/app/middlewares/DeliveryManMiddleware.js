const DeliveryMan = require('../models/DeliveryMan');
const fs = require('fs');
const path = require('path');

const returnMessages = require('../utils/returnMessages');

function verifyFieldName(field) {
  let response = {
    success: true,
    data: {},
  };
  if (typeof field !== 'string' || field.toString().length < 3) {
    response = {
      data: returnMessages.unknownError({
        message: 'Insira um nome válido!',
      }),
      success: false,
    };
  }

  return response;
}

function verifyFieldEmail(field) {
  let response = {
    success: true,
    data: {},
  };
  if (
    typeof field !== 'string' ||
    !field.toString().includes('@') ||
    !field.toString().includes('.')
  ) {
    response = {
      data: returnMessages.unknownError({
        message: 'Insira um email válido!',
      }),
      success: false,
    };
  }

  return response;
}

function deleteFile(file) {
  fs.unlinkSync(
    path.resolve(__dirname, '..', '..', '..', 'uploads', 'avatars', `${file}`)
  );
}

module.exports = {
  async verifyId(req, res, next) {
    const { id } = req.params;

    if (id.toString().length !== 8) {
      const response = returnMessages.unknownError({
        message: 'Por favor insira um ID válido',
      });

      if (req.file) deleteFile(req.file.filename);

      return res.status(response.statusCode).json(response);
    }

    const deliveryman = await DeliveryMan.getOneDeliveryMan(['del_id'], [id]);

    if (!deliveryman.data) {
      if (req.file) deleteFile(req.file.filename);

      const response = returnMessages.notFound({
        message: 'O Entregador não existe!',
      });
      return res.status(response.statusCode).json(response);
    }

    next();
  },

  async verifyData(req, res, next) {
    const { name, email } = req.body;
    const responseName = verifyFieldName(name);
    if (!responseName.success) {
      const { data: response } = responseName;

      deleteFile(req.file.filename);
      return res.status(response.statusCode).json(response);
    }
    const responseEmail = verifyFieldEmail(email);
    if (!responseEmail.success) {
      deleteFile(req.file.filename);

      const { data: response } = responseEmail;
      return res.status(response.statusCode).json(response);
    }

    next();
  },

  async verifyDataBeforeUpdate(req, res, next) {
    const { email } = req.body;
    const { id } = req.params;
    let deliveryman = await DeliveryMan.getOneDeliveryMan(
      ['del_email'],
      [email]
    );

    if (deliveryman.data && deliveryman.data.del_id !== id) {
      deleteFile(req.file.filename);

      const response = returnMessages.alreadExists({
        message: 'O endereço de email já está associado a outra conta!',
      });
      return res.status(response.statusCode).json(response);
    }

    deliveryman = await DeliveryMan.getOneDeliveryMan(['del_id'], [id]);

    deleteFile(deliveryman.data.del_avatar_id);

    next();
  },

  async verifyIdBeforeInsert(req, res, next) {
    const { email } = req.body;
    const response = await DeliveryMan.getOneDeliveryMan(
      ['del_email'],
      [email]
    );
    if (response.data) {
      deleteFile(req.file.filename);

      const response = returnMessages.alreadExists({
        message: 'O entregador já existe!',
      });
      return res.status(response.statusCode).json(response);
    }
    next();
  },
};
