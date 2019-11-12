import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserDatabaseService from './../../services/database/userDatabaseService';
import { IResponse } from '../../config/interfaces/IMiddlewareParams';
import { IUser } from './interfaces/IUser';
import * as config from '../../config/config';
import User from './userModel';

class AuthService {
  private _userDataService: UserDatabaseService;

  constructor() {
    this._userDataService = new UserDatabaseService(User);
  }

  public async createUser(user: any): Promise<any> {
    return await this._userDataService.create('', user);
  }

  public async login(email: string) {
    return await this._userDataService.findOne('', { email }).select('+password');
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

  public async checkPasswordForValidity(candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  public checkForAbsentFields(email: string, password: string): string {
    if (!email) return 'No email specified.';
    if (!password) return 'No password specified.';
    return null;
  }
}

export default new AuthService();
