const stateCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  authorization: 401,
  conflit: 409
};

module.exports = {
  unknownError({ message = 'Houve um erro, tente novamente!' }) {
    return {
      statusCode: stateCodes.badRequest,
      success: false,
      message
    };
  },

  foundSuccessfully({
    message = 'Encontrado com êxito!',
    data = {},
    statusCode = 200,
    success = true
  }) {
    return {
      statusCode,
      message,
      success,
      data
    };
  },

  alreadExists({ message = 'Registo existente!', data = {} }) {
    return {
      statusCode: stateCodes.conflit,
      message,
      success: false,
      data
    };
  },

  errorAuthorization({ message = 'Token Inválido' }) {
    return {
      statusCode: stateCodes.authorization,
      success: false,
      message
    };
  },

  notFound({ message = 'Registro inexistente!' }) {
    return { statusCode: stateCodes.badRequest, message, success: false };
  },

  successfullyCreated({
    data = {},
    total = 0,
    message = 'Inserção feita com êxito!'
  }) {
    return {
      statusCode: stateCodes.created,
      success: true,
      data,
      total,
      message
    };
  },

  successfullyReceived({
    data = [],
    total = 0,
    message = 'Dados Carregados com êxito!'
  }) {
    return {
      statusCode: stateCodes.ok,
      success: true,
      data,
      total,
      message
    };
  },

  successfullyDeleted({ message = '' }) {
    return {
      message,
      statusCode: stateCodes.ok,
      success: true
    };
  },

  successfullyUpdated({ message = '', data = {} }) {
    return {
      message,
      statusCode: stateCodes.ok,
      success: true,
      data
    };
  }
};
