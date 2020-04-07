const dbConnection = require('../../database');
const Token = require('../../libs/Token');
const returnMessages = require('../utils/returnMessages');
const returnFiltersTemplate = require('../utils/returnFiltersTemplate');
const appConfig = require('../../configs/app');
const newDate = require('../utils/returnNewDate');

class DeliveryMan {
  static async deleteDelivery(id) {
    try {
      await dbConnection.dbRun(
        'DELETE FROM tb_delivery_guys WHERE del_id = ?',
        [id]
      );

      return returnMessages.successfullyDeleted({
        message: 'O entregador foi removido com êxito!',
      });
    } catch (error) {
      return returnMessages.unknownError({});
    }
  }

  static async updateDeliveryMan({ name, email, avatar_id, id }) {
    try {
      const {
        changes,
      } = await dbConnection.dbRun(
        `UPDATE tb_delivery_guys SET del_name = ?, del_email = ?, del_avatar_id = ?, del_updated_at = ? WHERE del_id = ?`,
        [name, email, avatar_id, newDate, id]
      );

      if (!changes) {
        return returnMessages.unknownError({
          message: 'Houve um erro na edição, tente novamente!',
        });
      }

      return returnMessages.successfullyUpdated({
        message: 'Entregador editado com sucesso',
        data: {
          del_id: id,
          del_name: name,
          del_avatar_id: avatar_id,
          del_email: email,
          del_updated_at: newDate,
          del_avatar_url: `${appConfig.url}files/avatars/${avatar_id}`,
        },
      });
    } catch (err) {
      console.log(err);
      return returnMessages.unknownError({});
    }
  }

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

    const date = newDate;
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
          del_avatar_url: `${appConfig.url}files/avatars/${avatar_id}`,
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
