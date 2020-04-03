const stateCodes = {
  ok: 200,
  badRequest: 400
};

module.exports = {
  unknownError(message = 'Houve um erro, tente novamente!') {
    return {
      statusCode: stateCodes.ok,
      success: false,
      message
    };
  },

  notFound(message = 'Registro inexistente!') {
    return { statusCode: stateCodes.badRequest, message, success: false };
  },

  successfullyCreated({
    data = {},
    total = 0,
    message = 'Inserção feita com êxito!'
  }) {
    return {
      statusCode: stateCodes.ok,
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

  successfullyDeleted() {
    return {};
  }
};
