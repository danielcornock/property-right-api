import { IResponse } from '../../utilities/interfaces/IMiddlewareParams';

class ResponseService {
  public successFind(
    res: IResponse,
    data: object | Array<object>,
    type: string
  ): void {
    res.status(200).json({
      status: 'success',
      data: {
        [type]: data
      }
    });
  }

  public successCreate(
    res: IResponse,
    data: object | Array<object>,
    type: string
  ): void {
    res.status(201).json({
      status: 'success',
      data: {
        [type]: data
      }
    });
  }

  public successDelete(res: IResponse) {
    res.status(204).send();
  }
}

export default new ResponseService();
