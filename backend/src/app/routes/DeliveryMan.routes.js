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
  DeliveryManMiddleware.verifyIdBeforeInsert,
  DeliveryManController.store
);

routes.get('/', DeliveryManController.index);

module.exports = routes;
