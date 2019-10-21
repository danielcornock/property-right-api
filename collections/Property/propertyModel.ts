import { Schema, models, model, Model, Document } from 'mongoose';
import { PropertyMiddleware } from './propertyMiddleware';

//*---------------------------------------------
//* Model Definition
//*---------------------------------------------
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

export default models.Property || model('Property', propertySchema);
