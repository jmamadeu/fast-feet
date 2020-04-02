const routes = require('express').Router();

const SessionCustomMiddleware = require('../middlewares/custom/storeSession');

const SessionController = require('../controllers/SessionController');

routes.post('/', SessionCustomMiddleware, SessionController.store);

module.exports = routes;
