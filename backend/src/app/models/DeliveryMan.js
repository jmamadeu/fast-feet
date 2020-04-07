const dbConnection = require('../../database');
const Token = require('../../libs/Token');
const returnMessages = require('../utils/returnMessages');
const returnFiltersTemplate = require('../utils/returnFiltersTemplate');
const appConfig = require('../../configs/app');

class DeliveryMan {
  static async getAllDeliveryGuys({ page = 1, items_page = 5 }) {
    // const filters = returnFiltersTemplate.returnTemplateFilters(filters)
    const newPage = page * items_page - items_page;
    try {
      const deliveryGuys = await dbConnection.dbAll(
        `SELECT * FROM tb_delivery_guys LIMIT ${newPage},${items_page}`
      );

      const deliveryGuys_count = await dbConnection.dbAll(
        `SELECT * FROM tb_delivery_guys`
      );

      return returnMessages.successfullyReceived({
        data: deliveryGuys.map((deliveryMan) => {
          return {
            ...deliveryMan,
            del_avatar_url: `${appConfig.url}files/avatars/${deliveryMan.del_avatar_id}`,
          };
        }),
        total: deliveryGuys_count.length,
        message: 'Entregadores carregados com êxito!',
      });
    } catch (err) {
      return returnMessages.unknownError({});
    }
  }

  static async getOneDeliveryMan(filters = [], params = []) {
    filters = returnFiltersTemplate.returnTemplateFilters(filters);

    try {
      const deliveryMan = await dbConnection.dbGet(
        `SELECT * FROM tb_delivery_guys WHERE ${filters}`,
        params
      );

      if (!deliveryMan) {
        return returnMessages.notFound({ message: 'O Entregador não existe!' });
      }

      return returnMessages.foundSuccessfully({
        message: 'Entregador encontrado com êxito!',
        data: deliveryMan,
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
          del_email: email,
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
