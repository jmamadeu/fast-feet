const routes = require('express').Router();

const SessionRoutes = require('./Session.routes');
const RecipientRoutes = require('./Recipient.routes');
const DeliveryManRoutes = require('./DeliveryMan.routes');

routes.use('/sessions', SessionRoutes);
routes.use('/recipients', RecipientRoutes);
routes.use('/delivery-guys', DeliveryManRoutes);

module.exports = routes;
