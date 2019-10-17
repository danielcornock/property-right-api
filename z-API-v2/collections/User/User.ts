import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Schema, model, Document, Model } from 'mongoose';

import { UserMiddleware } from './userMiddleware';
import * as config from '../../../utilities/config';
import { IResponse } from '../../../utilities/interfaces/IMiddlewareParams';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name, so we know what to call you!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'You must enter an email address!'],
    unique: [true, 'Sorry, that email address already exists!'],
    lowercase: true,
    trim: true,
    validate: [
      validator.isEmail,
      "Hmm, it seems like that email address isn't valid!"
    ]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'You must enter a password'],
    minlength: 8,
    select: false // Password will not output
  }
});

new UserMiddleware(userSchema);

export const checkPasswordForValidity = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const createSendToken = (user: any, res: IResponse) => {
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
};

export default model('User', userSchema);
