import { Schema } from 'mongoose';

export interface IProperty {
  name: string;
  monthlyRent: number;
  image: string;
  user: Schema.Types.ObjectId;
  tenants: Array<Schema.Types.ObjectId>;
}
