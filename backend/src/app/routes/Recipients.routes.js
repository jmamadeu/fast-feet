const routes = require('express').Router();

const RecipientController = require('../controllers/RecipientsController');

const verifyDataRecipients = require('../middlewares/custom/verifyDataRecipients');
const verifyIdRecipientMiddleware = require('../middlewares/custom/verifyIdRecipient');

const authMiddleware = require('../middlewares/authMiddleware');
const verifyIdRecipient = require('../middlewares/verifyIdRecipientExists');

routes.use(authMiddleware);

routes.get('/', RecipientController.index);
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
