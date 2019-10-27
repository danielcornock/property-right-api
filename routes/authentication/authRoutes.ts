import { BaseRoutes } from '../abstract/baseRoutes';
import { AuthController } from '../../collections/User/authController';

export class AuthRoutes extends BaseRoutes {
  private _authController: AuthController;

  constructor() {
    super();
    this._authController = new AuthController();
    this._assignRoutes();
  }

  protected _assignRoutes(): void {
    this.router.post('/signup', (...args) => this._authController.signup(...args));
    this.router.post('/login', (...args) => this._authController.login(...args));
  }
}

export default new AuthRoutes().routes;
