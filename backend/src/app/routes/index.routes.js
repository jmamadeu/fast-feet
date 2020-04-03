const routes = require('express').Router();

const SessionRoutes = require('./Session.routes');

const User = require('../models/User');

routes.use('/sessions', SessionRoutes);

routes.get('/', async (req, res) => {
  const response = await User.getAllUsers();

  return res.status(response.statusCode).json(response);
});

module.exports = routes;
