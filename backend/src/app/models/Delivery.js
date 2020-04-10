const dbConnection = require('../../database');
const returnMessages = require('../utils/returnMessages');
const returnFilters = require('../utils/returnFiltersTemplate');
const date = require('../utils/returnNewDate');

class Delivery {
  static async getOneDelivery({ filters = [], params = [] }) {
    try {
      filters = returnFilters.returnTemplateFilters(filters);

      const delivery = await dbConnection.dbGet(
        `SELECT * FROM tb_deliverys INNER JOIN tb_delivery_guys ON ds_deliveryman_id = del_id 
      INNER JOIN tb_recipients ON ds_recipient_id = rec_id WHERE ${filters}`,
        params
      );

      return returnMessages.foundSuccessfully({ data: delivery });
    } catch (err) {
      return returnMessages.unknownError({});
    }
  }

  static async getAllDeliverys({ page = 1, items_pag = 5 }) {
    try {
      const start = page * items_pag - items_pag;

      const deliverys = await dbConnection.dbAll(`SELECT * FROM tb_deliverys INNER JOIN tb_delivery_guys ON ds_deliveryman_id = del_id 
      INNER JOIN tb_recipients ON ds_recipient_id = rec_id  LIMIT ${start},${items_pag}`);

      return returnMessages.successfullyReceived({
        data: deliverys,
        total: deliverys.length,
        message: 'Dados Carregados com êxito!',
      });
    } catch (err) {
      return returnMessages.unknownError({});
    }
  }

  static async deleteDelivery(id) {}

  static async createDelivery({ recipient_id, delivery_man_id, product }) {
    const newDate = date.getNow;
    try {
      const {
        lastID,
      } = await dbConnection.dbRun(
        `INSERT INTO tb_deliverys (ds_recipient_id, ds_deliveryman_id, ds_product, ds_created_at, ds_updated_at)`,
        [recipient_id, delivery_man_id, product, newDate, newDate]
      );

      return returnMessages.successfullyCreated({
        data: { id: lastID },
        message: 'Entrega criada com êxito!',
      });
    } catch (err) {
      return returnMessages.unknownError({});
    }
  }
}

module.exports = Delivery;
