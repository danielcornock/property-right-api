import { Document } from 'mongoose';

export interface IProperty extends Document {
  user: string;
  name: string;
  town: string;
  country: string;
  url: string;
  monthlyRent: number;
  image: string;
}
