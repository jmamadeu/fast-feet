const dbConnection = require('../../database');
const returnMessages = require('../utils/returnMessages');
const returnFiltersTemplate = require('../utils/returnFiltersTemplate');

class Recipient {
  static async updateRecipient({
    id,
    name,
    city,
    address,
    phone,
    identifiyer
  }) {
    try {
      await dbConnection.dbRun(
        `UPDATE tb_recipients  SET rec_name = ?, rec_city = ?, rec_address = ?, rec_phone = ?, rec_identifiyer = ? WHERE rec_id = ?`,
        [name, city, address, phone, identifiyer, id]
      );

      const user = await this.getOneRecipient(['rec_id'], [id]);

      return returnMessages.successfullyUpdated({
        message: 'O destinatário foi actualizado com êxito!',
        data: user.data
      });
    } catch (err) {
      return returnMessages.unknownError({});
    }
  }

  static async getAllRecipient() {
    try {
      const recipients = await dbConnection.dbAll(
        'SELECT * FROM tb_recipients'
      );

      return returnMessages.successfullyReceived({
        data: recipients,
        total: recipients.length,
        message: 'Dados dos recipientes carregados com sucesso!'
      });
    } catch (err) {
      return returnMessages.unknownError({});
    }
  }

  static async deleteRecipient(id) {
    try {
      await dbConnection.dbRun('DELETE FROM tb_recipients WHERE rec_id = ?', [
        id
      ]);

      return returnMessages.successfullyDeleted({
        message: 'O destinatário foi removido com êxito!'
      });
    } catch (err) {
      return returnMessages.unknownError({});
    }
  }

  static async getOneRecipient(filters = [], params) {
    try {
      filters = returnFiltersTemplate.returnTemplateFilters(filters);

      const recipient = await dbConnection.dbGet(
        `SELECT * from tb_recipients WHERE ${filters}`,
        params
      );

      if (!recipient) {
        return returnMessages.notFound({
          message: 'O destinatário não foi encontrado!'
        });
      }

      return returnMessages.foundSuccessfully({
        message: 'Destinatário encontrado com êxito!',
        data: recipient
      });
    } catch (err) {
      return returnMessages.unknownError({});
    }
  }

  static async createRecipient({ name, city, address, phone, identifiyer }) {
    try {
      const {
        lastID
      } = await dbConnection.dbRun(
        'INSERT INTO tb_recipients (rec_name, rec_city, rec_address, rec_phone, rec_identifiyer) VALUES( ?, ?, ?, ?, ?)',
        [name, city, address, phone, identifiyer]
      );

      return returnMessages.successfullyCreated({
        data: {
          rec_id: lastID,
          rec_name: name,
          rec_city: city,
          rec_address: address,
          rec_phone: phone,
          rec_identifiyer: identifiyer
        },
        message: 'Destinatário cadastrado com êxito!'
      });
    } catch (err) {
      return returnMessages.unknownError({
        message: 'Aconteceu um erro inesperado, tente novamente!'
      });
    }
  }
}

module.exports = Recipient;
