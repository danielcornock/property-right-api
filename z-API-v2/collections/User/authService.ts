import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserDatabaseService from './../../services/database/userDatabaseService';
import { IResponse } from '../../../utilities/interfaces/IMiddlewareParams';
import { IUser } from './interfaces/IUser';
import * as config from '../../../utilities/config';

class AuthService {
  constructor() {}

  public async createUser(user: any): Promise<any> {
    return await UserDatabaseService.create(user);
  }

  public async login(email: string) {
    return await UserDatabaseService.findOne({ email });
  }

  public createSendToken(user: IUser, res: IResponse): void {
    const name = user.name.split(' ')[0];
    const id = user._id;
    const token = jwt.sign({ id, name }, config.jwtSecret, {
      expiresIn: config.jwtExpires
    });

    user.password = undefined;

    res.status(200).json({
      token: token,
      data: {
        user
      }
    });
  }

  public async checkPasswordForValidity(
    candidatePassword: string,
    userPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  public checkForAbsentFields(email: string, password: string): string {
    if (!email) return 'No email specified.';
    if (!password) return 'No password specified.';
    return null;
  }
}

export default new AuthService();
