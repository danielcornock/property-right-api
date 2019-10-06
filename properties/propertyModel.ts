import { Schema, Document, model, Model } from 'mongoose';
import { INext } from '../utilities/interfaces/IMiddlewareParams';
const validator = require('validator');

export interface IPropertyModel extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  monthlyRent: number;
  image: string;
  tenants: Array<Schema.Types.ObjectId>;
}

const propertySchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You must be logged in to post a property.']
  },
  name: String,
  monthlyRent: Number,
  image: String,
  tenants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tenant'
    }
  ]
});

propertySchema.pre(/^find/ as any, function(this: Document, next: INext) {
  this.populate({
    path: 'tenants',
    select: 'name email phone avatar'
  });
  next();
});

const Property: Model<IPropertyModel> = model<IPropertyModel>(
  'Property',
  propertySchema
);

export default Property;
