import {
  IRequest,
  IResponse,
  INext
} from '../../../utilities/interfaces/IMiddlewareParams';
import authService from './authService';

export class AuthController {
  public async signup(req: IRequest, res: IResponse, next: INext) {
    const { name, email, password } = req.body;
    const user = await authService.createUser({
      name,
      email,
      password
    });

    authService.createSendToken(user, res);
  }

  public async login(req: IRequest, res: IResponse, next: INext) {
    const { email, password } = req.body;
    let error: string;

    error = authService.checkForAbsentFields(email, password);
    if (error) return next(new Error(error));

    const user = await authService.login(email);

    if (!user) return next(new Error('Incorrect email address.'));

    if (!(await authService.checkPasswordForValidity(password, user.password)))
      return next(new Error('Incorrect password.'));

    authService.createSendToken(user, res);
  }
}
