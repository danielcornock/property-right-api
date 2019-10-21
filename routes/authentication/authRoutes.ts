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
    this.router.post('/signup', this._authController.signup);
    this.router.post('/login', this._authController.login);
  }
}

export default new AuthRoutes().routes;
