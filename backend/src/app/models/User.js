const dbConnection = require('../../database');

const customMessages = require('../utils/returnMessages');

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
      return customMessages.unknownError();
    }
  }

  static async getOneUser(filters, params) {
    try {
      const user = await dbConnection.dbGet(
        `SELECT * FROM tb_users WHERE ${filters}`,
        params
      );

      if (!user) {
        return customMessages.notFound('Usuário inexistente!');
      }

      return customMessages.successfullyReceived({ data: user, total: 1 });
    } catch (err) {
      return customMessages.unknownError();
    }
  }
}

module.exports = User;
