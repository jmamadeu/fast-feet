const routes = require('express').Router();
const multer = require('multer');

const DeliveryManController = require('../controllers/DeliveryMan');
const uploadAvatarConfig = require('../../configs/upload');

const upload = multer(uploadAvatarConfig.storage_avatar);

routes.post('/', upload.single('avatar_id'), DeliveryManController.store);

module.exports = routes;
