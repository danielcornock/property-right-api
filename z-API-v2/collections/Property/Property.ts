import { Schema, model } from 'mongoose';
import { PropertyMiddleware } from './propertyMiddleware';

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

new PropertyMiddleware(propertySchema);

export default model('Property', propertySchema);
