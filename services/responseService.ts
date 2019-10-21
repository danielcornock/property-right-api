import { IResponse } from '../config/interfaces/IMiddlewareParams';

class ResponseService {
  public successFind(res: IResponse, data: object | Array<object>): void {
    res.status(200).json({
      status: 'success',
      data: {
        ...data
      }
    });
  }

  public successCreate(res: IResponse, data: object | Array<object>): void {
    res.status(201).json({
      status: 'success',
      data: {
        ...data
      }
    });
  }

  public successDelete(res: IResponse) {
    res.status(204).send();
  }
}

export default new ResponseService();
