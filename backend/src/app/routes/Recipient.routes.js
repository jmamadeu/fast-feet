const routes = require('express').Router();

const RecipientController = require('../controllers/RecipientController');

const verifyDataRecipients = require('../middlewares/custom/verifyDataRecipients');
const verifyIdRecipientMiddleware = require('../middlewares/custom/verifyIdRecipient');

const authMiddleware = require('../middlewares/authMiddleware');
const verifyIdRecipient = require('../middlewares/verifyIdRecipientExists');
const verifyPagination = require('../middlewares/custom/verifyPagination');

routes.use(authMiddleware);

routes.get('/', verifyPagination, RecipientController.index);

routes.get('/:id', verifyIdRecipientMiddleware, RecipientController.show);

routes.post(
  '/',
  verifyDataRecipients,
  verifyIdRecipient.verifyIdBeforeCreate,
  RecipientController.store
);

routes.delete(
  '/:id',
  verifyIdRecipientMiddleware,
  verifyIdRecipient.verifyExists,
  RecipientController.delete
);

routes.put(
  '/:id',
  verifyDataRecipients,
  verifyIdRecipientMiddleware,
  verifyIdRecipient.verifyExists,
  verifyIdRecipient.verifyBeforeUpdate,
  RecipientController.update
);

module.exports = routes;
