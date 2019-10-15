import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from './userModel';
import { catchAsync } from '../errors/catchAsync';
import AppError from '../errors/AppError';
import * as userMethods from './userMethods';
import * as config from '../utilities/config';
import {
  IRequest,
  IResponse,
  INext
} from '../utilities/interfaces/IMiddlewareParams';

//*---------------------------------------------
//* SIGN UP NEW USER
//*---------------------------------------------
export const signup = catchAsync(
  async (req: IRequest, res: IResponse, next: INext) => {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    userMethods.createSendToken(user, 201, res);
  }
);

//*---------------------------------------------
//* LOG IN TO EXISTING ACCOUNT
//*---------------------------------------------
export const login = catchAsync(
  async (req: IRequest, res: IResponse, next: INext) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new AppError('Please provide an email address and password.')
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
    userMethods.createSendToken(user, 201, res);
  }
);

//*---------------------------------------------
//* CONFIRM USER IS LOGGED IN
//*---------------------------------------------
export const authGuard = catchAsync(
  async (req: IRequest, res: IResponse, next: INext) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError('You are not logged in. Please log in to continue.', 401)
      );
    }

    const decoded = await promisify(jwt.verify)(token, config.jwtSecret);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(new AppError('This user no longer exists!', 401));
    }
    //TODO: Add checks that user hasn't changed their password recently

    req.user = currentUser;
    next();
  }
);
