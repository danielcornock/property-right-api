import { IAvatar } from './IAvatarColors';
import { Document } from 'mongoose';

export interface ITenant extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  propertyName: string;
  user: string;
  avatar: IAvatar;
}
