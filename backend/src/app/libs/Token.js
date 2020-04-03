const jwt = require('jsonwebtoken');
const bcryp = require('bcryptjs');

const authConfig = require('../../configs/auth');

class Token {
  static async generateJWT({ data = {}, expires = 86400 }) {
    const token = jwt.sign({ ...data }, authConfig.secret, {
      expiresIn: expires
    });

    return token;
  }

  static compareTokenPassword(password, tokenPassword) {
    return bcryp.compareSync(password, tokenPassword);
  }
}

module.exports = Token;
