import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

import { INext } from '../../config/interfaces/IMiddlewareParams';

export class AuthQueryMiddleware {
  private _userSchema: Schema;

  constructor(userSchema: Schema) {
    this._userSchema = userSchema;
    this._checkIfPasswordModified();
  }

  private _checkIfPasswordModified() {
    this._userSchema.pre('save', async function(this: any, next: INext) {
      if (!this.isModified('password')) {
        return next();
      }

      this.password = await bcrypt.hash(this.password, 12);

      next();
    });
  }
}
