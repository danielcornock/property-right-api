import { IRequest } from '../utilities/interfaces/IMiddlewareParams';

export function setImagePath(req: IRequest) {
  const url: string = req.protocol + '://' + req.get('host');
  const randomNum: number = Math.floor(Math.random() * 3) + 1;
  let imagePath = url + '/images/' + `default-${randomNum}.png`;
  if (req.file) {
    imagePath = url + '/images/' + req.file.filename;
  }

  return imagePath;
}
