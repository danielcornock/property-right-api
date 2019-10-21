import { IAvatar } from './IAvatarColors';

export interface ITenant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName: string;
  user: string;
  avatar: IAvatar;
}
