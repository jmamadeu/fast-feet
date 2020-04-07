const routes = require('express').Router();
const multer = require('multer');

const uploadAvatarConfig = require('../../configs/upload');
const upload = multer(uploadAvatarConfig.storage_avatar);

const DeliveryManController = require('../controllers/DeliveryMan');

const authMiddleware = require('../middlewares/authMiddleware');
const DeliveryManMiddleware = require('../middlewares/DeliveryManMiddleware');

routes.use(authMiddleware);

routes.post(
  '/',
  upload.single('avatar_id'),
  DeliveryManMiddleware.verifyData,
  DeliveryManMiddleware.verifyIdBeforeInsert,
  DeliveryManController.store
);

routes.put(
  '/:id',
  upload.single('avatar_id'),
  DeliveryManMiddleware.verifyData,
  DeliveryManMiddleware.verifyId,
  DeliveryManMiddleware.verifyDataBeforeUpdate,
  DeliveryManController.update
);

routes.delete(
  '/:id',
  DeliveryManMiddleware.verifyId,
  DeliveryManController.delete
);

routes.get('/', DeliveryManController.index);
routes.get('/:id', DeliveryManMiddleware.verifyId, DeliveryManController.show);

module.exports = routes;
