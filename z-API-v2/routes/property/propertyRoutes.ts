import {
  IRequest,
  IResponse,
  INext
} from '../../../utilities/interfaces/IMiddlewareParams';
import todoRoutes from '../todo/todoRoutes';
import { Router } from 'express';
import PropertyController from '../../collections/Property/propertyController';
import { AbstractRoutes } from '../abstract/abstractRoutes';
import authMiddleware from '../../collections/User/authMiddleware';

export class PropertyRoutes extends AbstractRoutes {
  private _propertyController: PropertyController;

  constructor() {
    super();
    this._propertyController = new PropertyController();
    this._useExternalRoutes();
    this._assignRoutes();
    this.router.use(authMiddleware.authGuard);
  }

  public _assignRoutes(): void {
    this.router.get('/', this._propertyController.getAll);
  }

  public _useExternalRoutes(): void {
    this.router.use('/todos', todoRoutes);
  }
}

export default new PropertyRoutes().router;
