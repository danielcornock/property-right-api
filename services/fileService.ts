import { IRequest } from '../config/interfaces/IMiddlewareParams';
import multer from 'multer';

class FileService {
  private readonly MIME_TYPE_MAP: MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
  };

  constructor() {}

  public setImagePath(req: IRequest) {
    const url: string = req.protocol + '://' + req.get('host');
    const randomNum: number = Math.floor(Math.random() * 3) + 1;
    let imagePath = url + '/images/' + `default-${randomNum}.png`;
    if (req.file) {
      imagePath = url + '/images/' + req.file.filename;
    }

    return imagePath;
  }

  public multer() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const isValid = this.MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid file type');
        if (isValid) {
          error = null;
        }
        cb(error, 'images');
        cb(null, './images');
      },
      filename: (req, file, cb) => {
        const name = file.originalname
          .toLowerCase()
          .split(' ')
          .join('-');
        const extension = this.MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extension);
      }
    });

    return multer({ storage: storage });
  }
}

export interface MIME_TYPE_MAP {
  [key: string]: string;
}

export default new FileService();
