import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as config from '../utilities/config';
import { IUser } from '../users/interfaces/IUser';
import { IResponse } from '../utilities/interfaces/IMiddlewareParams';
import { CookieOptions } from 'express-serve-static-core';

const signToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpires
  });
};

export const checkPasswordMatch = (userSchema: IUser) => {
  userSchema.methods.correctPassword = async (
    candidatePassword: string,
    userPassword: string
  ) => {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
};

export const createSendToken = (
  user: IUser,
  statusCode: number,
  res: IResponse
) => {
  const token = signToken(user._id);
  const cookieOptions: CookieOptions = {
    expires: new Date(
      (Date.now() as number) + config.jwtCookieExpires * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (config.env === 'production') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);

  // Remove passwords from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  });
};
