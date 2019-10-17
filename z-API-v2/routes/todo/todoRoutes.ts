import {
  IRequest,
  IResponse,
  INext
} from '../../../utilities/interfaces/IMiddlewareParams';
import express, { Router } from 'express';
import { AbstractRoutes } from '../abstract/abstractRoutes';

export class TodoRoutes extends AbstractRoutes {
  public router: Router;
  constructor() {
    super();
    this.router = express.Router();
    this._assignRoutes();
  }

  protected _assignRoutes(): void {
    this.router.get('/', (req: IRequest, res: IResponse, next: INext) => {
      res.status(200).json({
        message: 'Todos reached'
      });
    });
  }
}

export default new TodoRoutes().router;
