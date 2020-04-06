const multer = require('multer');
const path = require('path');

module.exports = {
  storage_avatar: {
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'uploads', 'avatars'),
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);

        cb(null, `${name}-${Date.now()}${ext}`);
      },
    }),
  },
};
