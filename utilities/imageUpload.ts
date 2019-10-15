import multer from 'multer';
import AppError from '../errors/AppError';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const isValid = MIME_TYPE_MAP[file.mimetype];
    // let error = new AppError('Invalid file type', 400);
    // if (isValid) {
    //   error = null;
    // }
    // cb(error, 'images');
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension);
  }
});

export default multer({ storage: storage });
