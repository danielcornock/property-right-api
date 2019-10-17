import {
  IRequest,
  IResponse,
  INext
} from '../../../utilities/interfaces/IMiddlewareParams';
import User from './User';
import * as userMethods from './User';
import { IUser } from './interfaces/Iuser';
import databaseService from '../../services/databaseService';

export class AuthController {
  public async signup(req: IRequest, res: IResponse, next: INext) {
    const user = await databaseService.create(User, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      accountCreated: Date.now()
    });

    userMethods.createSendToken(user, res);
  }

  public async login(req: IRequest, res: IResponse, next: INext) {
    const { email, password } = req.body;

    if (!email) return next(new Error('No email specified.'));

    if (!password) return next(new Error('No password specified.'));

    const user: Partial<IUser> = await databaseService.findUser(User, {
      email
    });

    if (!user) return next(new Error('Incorrect email address.'));

    if (!(await userMethods.checkPasswordForValidity(password, user.password)))
      return next(new Error('Incorrect password.'));

    userMethods.createSendToken(user, res);
  }
}
