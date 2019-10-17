import { AbstractRoutes } from '../abstract/abstractRoutes';
import { Router } from 'express';
import { AuthController } from '../../collections/User/authController';
import PropertyController from '../../collections/Property/propertyController';

export class AuthRoutes extends AbstractRoutes {
  public router: Router;
  private _authController: AuthController;

  constructor() {
    super();
    this._authController = new AuthController();
    this.router = Router();
    this._assignRoutes();
  }

  protected _assignRoutes(): void {
    this.router.post('/signup', this._authController.signup);
    this.router.post('/login', this._authController.login);
  }
}

export default new AuthRoutes().router;
