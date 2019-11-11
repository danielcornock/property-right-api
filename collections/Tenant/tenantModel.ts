import { Schema, model, Model, Document, models } from 'mongoose';
import { TenantQueryMiddleware } from './tenantQueryMiddleware';
import Property from '../Property/propertyModel';
import { ITenant } from './interfaces/ITenant';

//*---------------------------------------------
//* Model Definition
//*---------------------------------------------
const tenantSchema: Schema<ITenant> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to add a tenant']
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property'
    },
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

tenantSchema.index({ property: 1 });
tenantSchema.index({ user: 1 });

//*---------------------------------------------
//* Virtuals
//*---------------------------------------------
tenantSchema.virtual('avatar.initials').get(function getInitials(this: any) {
  const splitName = this.name.split(' ');
  return (splitName.length === 1
    ? splitName.join('')[0]
    : splitName.reduce((total: string, x: string, index: number) =>
        index === 1 ? total[0] + x[0] : total + x[0]
      )
  ).toUpperCase();
});

new TenantQueryMiddleware(tenantSchema);

export default models.Tenant || model('Tenant', tenantSchema);
