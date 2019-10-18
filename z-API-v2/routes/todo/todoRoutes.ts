import {
  IRequest,
  IResponse,
  INext
} from '../../../utilities/interfaces/IMiddlewareParams';
import express, { Router } from 'express';
import { BaseRoutes } from '../abstract/baseRoutes';
import { GuardedRoutes } from '../abstract/guardedRoutes';

export class TodoRoutes extends GuardedRoutes {
  constructor() {
    super();
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

export default new TodoRoutes().routes;
