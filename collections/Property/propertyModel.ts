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

new PropertyMiddleware(propertySchema);

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


export default models.Property || model('Property', propertySchema);
