const dbConnection = require('../../database');
const Token = require('../../libs/Token');
const returnMessages = require('../utils/returnMessages');
const returnFiltersTemplate = require('../utils/returnFiltersTemplate');

class DeliveryMan {
  static async getOneDeliveryMan(filters = [], params = []) {
    filters = returnFiltersTemplate.returnTemplateFilters(filters);

    try {
      const DeliveryMan = await dbConnection.dbGet(
        `SELECT * FROM tb_delivery_guys WHERE ${filters}`,
        params
      );

      if (!DeliveryMan) {
        return returnMessages.notFound({ message: 'O Entregador não existe!' });
      }

      return returnMessages.foundSuccessfully({
        message: 'Entregador encontrado com êxito!',
        data: DeliveryMan,
      });
    } catch (error) {
      return returnMessages.unknownError({});
    }
  }

  static async createDeliveryMan({ name, avatar_id = '', email }) {
    const newId = Token.generateId();

    const date = new Date()
      .toLocaleString()
      .replace('/', '')
      .replace('/', '')
      .replace(',', '');
    try {
      await dbConnection.dbRun(
        `INSERT INTO tb_delivery_guys VALUES(?,?,?,?,?,?)`,
        [newId, name, avatar_id, email, date, date]
      );

      return returnMessages.successfullyCreated({
        data: {
          del_id: newId,
          del_name: name,
          del_avatar_id: avatar_id,
          del_created_at: date,
          del_updated_at: date,
        },
        message: 'O entregador foi criado com êxito!',
        total: 1,
      });
    } catch (error) {
      return returnMessages.unknownError({});
    }
  }
}

module.exports = DeliveryMan;
