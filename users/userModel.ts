import { Document, Schema, model, Model } from 'mongoose';
import validator from 'validator';
import * as authMiddleware from './authMiddleware';
import * as userMethods from './userMethods';
import bcrypt from 'bcryptjs';
import { IUser } from '../users/interfaces/IUser';
import { IPropertyDocument } from '../properties/propertyModel';

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

userSchema.pre('save', async function(this: IUser, next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userMethods.checkPasswordMatch(userSchema);

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
