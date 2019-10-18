import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from './userModel';
import {
  IRequest,
  IResponse,
  INext
} from '../../../utilities/interfaces/IMiddlewareParams';
import * as config from '../../../utilities/config';
import { IUser } from '../../../users/interfaces/IUser';

class AuthMiddleware {
  public async authGuard(req: IRequest, res: IResponse, next: INext) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new Error('You are not logged in. Please log in to continue.')
      );
    }

    const decoded: any = await promisify(jwt.verify)(token, config.jwtSecret);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new Error('This user no longer exists!'));
    }

    // TODO Add checks that user hasn't changed their password recently

    req.user = currentUser as IUser;
    console.log('here');
    next();
  }
}

export default new AuthMiddleware();
