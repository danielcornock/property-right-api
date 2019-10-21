import mongoose, { Schema, Document } from 'mongoose';
import Property, { IPropertyDocument } from '../properties/propertyModel';
import { ITenantNote } from './interfaces/ITenantNote';
import { IAvatarColors } from './interfaces/IAvatarColors';
import { INext } from '../../utilities/interfaces/IMiddlewareParams';
import * as databaseService from '../../services/databaseService';

export interface ITenant {
  user: Schema.Types.ObjectId | string;
  propertyId: string;
  propertyName: string;
  name: string;
  email: string;
  phone: string;
  leadTenant: boolean;
  notes: Array<ITenantNote>;
  avatar: IAvatarColors;
}

export interface ITenantDocument extends ITenant, Document {}

const tenantSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to add a tenant']
    },
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    },
    propertyName: String,
    name: String,
    email: String,
    phone: String,
    leadTenant: {
      type: Boolean,
      default: false
    },
    notes: [
      {
        title: String,
        body: String
      }
    ],
    avatar: {
      bgColor: String,
      textColor: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tenantSchema.pre('save', async function setPropertyName(this: ITenantDocument, next: INext) {
  if (this.propertyId) {
    const { name }: IPropertyDocument = await databaseService.findById(Property, this.propertyId);
    this.propertyName = name;
  }

  next();
});

tenantSchema.pre('save', async function setAvatarDetails(this: ITenantDocument, next: INext) {
  const hue = Math.floor(Math.random() * (360 - 0)) + 0;
  this.avatar.bgColor = `hsl(${hue}, 58%, 76%)`;
  this.avatar.textColor = `hsl(${hue}, 58%, 20%)`;
  next();
});

tenantSchema.virtual('avatar.initials').get(function getInitials(this: ITenantDocument) {
  const splitName = this.name.split(' ');
  return (splitName.length === 1
    ? splitName.join('')[0]
    : splitName.reduce((total, x, index) => (index === 1 ? total[0] + x[0] : total + x[0]))
  ).toUpperCase();
});

const Tenant = mongoose.model('Tenant', tenantSchema);

export default Tenant;
