const dbConnection = require('../../database');

const customMessages = require('../utils/returnMessages');
const returnFiltersTemplate = require('../utils/returnFiltersTemplate');

class User {
  static async getAllUsers() {
    try {
      const users = await UserSchema.findAll();

      const response = customMessages.successfullyReceived({
        data: users,
        total: users.length
      });

      return response;
    } catch (err) {
      return customMessages.unknownError({});
    }
  }

  static async getOneUser(filters = [], params) {
    try {
      filters = returnFiltersTemplate.returnTemplateFilters(filters);
      const user = await dbConnection.dbGet(
        `SELECT * FROM tb_users WHERE ${filters}`,
        params
      );

      if (!user) {
        return customMessages.notFound({ message: 'Usuário inexistente!' });
      }

      return customMessages.foundSuccessfully({ data: user });
    } catch (err) {
      return customMessages.unknownError({});
    }
  }
}

module.exports = User;
