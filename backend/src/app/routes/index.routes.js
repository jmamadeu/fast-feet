const routes = require('express').Router();

const SessionRoutes = require('./Session.routes');
const RecipientRoutes = require('./Recipients.routes');

routes.use('/sessions', SessionRoutes);
routes.use('/recipients', RecipientRoutes);

module.exports = routes;
