const User = require('../models/User');
const Token = require('../libs/Token');

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    let response = await User.getOneUser(`user_email = ?`, [email]);

    if (response.success) {
      const hashPassword = Token.compareTokenPassword(
        password,
        response.data.user_password
      );

      if (hashPassword) {
        response.data = {
          ...response.data,
          user_password: undefined
        };

        const jwtToken = await Token.generateJWT({
          data: { id: response.data.id }
        });

        response = {
          ...response,
          token: jwtToken
        };
      }
    }

    return res.status(response.statusCode).json(response);
  }
};
