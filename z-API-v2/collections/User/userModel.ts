import validator from 'validator';
import bcrypt from 'bcryptjs';
import { Schema, model, Document, Model } from 'mongoose';

import { UserMiddleware } from './authQueryMiddleware';

const userSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

new UserMiddleware(userSchema);

export const checkPasswordForValidity = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default model('User', userSchema);
