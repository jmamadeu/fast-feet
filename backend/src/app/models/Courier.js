const dbConnection = require('../../database');
const Token = require('../../libs/Token');
const returnMessages = require('../utils/returnMessages');
const returnFiltersTemplate = require('../utils/returnFiltersTemplate');

class Courier {
  static async getOneCourier(filters = [], params = []) {
    filters = returnFiltersTemplate.returnTemplateFilters(filters);

    try {
      const courier = await dbConnection.dbGet(
        `SELECT * FROM tb_couries WHERE ${filters}`,
        params
      );

      if (!courier) {
        return returnMessages.notFound({ message: 'O Entregador não existe!' });
      }

      return returnMessages.foundSuccessfully({
        message: 'Entregador encontrado com êxito!',
        data: courier
      });
    } catch (error) {
      return returnMessages.unknownError({});
    }
  }

  static async createCourier({ name, avatar_id = '', email }) {
    const newId = Token.generateId();

    const date = new Date()
      .toLocaleString()
      .replace('/', '')
      .replace('/', '')
      .replace(',', '');
    try {
      await dbConnection.dbRun(`INSERT INTO tb_couries VALUES(?,?,?,?,?,?)`, [
        newId,
        name,
        avatar_id,
        email,
        date,
        date
      ]);

      return returnMessages.successfullyCreated({
        data: {
          cour_id: newId,
          cour_name: name,
          cour_avatar_id: avatar_id,
          cour_created_at: date,
          cour_updated_at: date
        },
        message: 'O entregador foi criado com êxito!',
        total: 1
      });
    } catch (error) {
      return returnMessages.unknownError({});
    }
  }
}

module.exports = Courier;
