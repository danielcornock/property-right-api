import mongoose, { Schema, model, Model, Document, models, Mongoose } from 'mongoose';
import { PropertyMiddleware } from './propertyMiddleware';

//*---------------------------------------------
//* Model Definition
//*---------------------------------------------
const propertySchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to post a property.']
    },
    name: String,
    monthlyRent: Number,
    image: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

propertySchema.virtual('todoCount', {
  ref: 'Todo',
  foreignField: 'propertyId',
  localField: '_id',
  count: true
});

propertySchema.virtual('tenants', {
  ref: 'Tenant',
  foreignField: 'propertyId',
  localField: '_id'
});

new PropertyMiddleware(propertySchema);

export default models.Property || model('Property', propertySchema);
