const returnMessages = require('../utils/returnMessages');
const Token = require('../../libs/Token');

module.exports = async (req, res, next) => {
  function returnMessage(message) {
    const response = returnMessages.errorAuthorization({ message });
    return res.status(response.statusCode).json(response);
  }

  const authToken = req.headers.authorization;

  if (!authToken) {
    return returnMessage('Token não informado!');
  }

  const parts = authToken.split(' ');

  if (!parts.lenght === 2) {
    return returnMessage('Erro no Token!');
  }

  const [type, token] = parts;

  if (type !== 'Bearer') {
    return returnMessage('Token mal formado!');
  }

  try {
    await Token.verifyToken(token);

    next();
  } catch (err) {
    return returnMessage('Token Inválido');
  }
};
