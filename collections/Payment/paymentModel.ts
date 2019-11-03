import mongoose, { Schema, model, models } from 'mongoose';

//*---------------------------------------------
//* Model Definition
//*---------------------------------------------
const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to post a property.']
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: [true, 'A rental payment must be linked to a tenant']
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'A rental payment must be linked to a property']
    },
    amount: {
      type: Number,
      required: [true, 'You must supply a value for the rental amount.']
    },
    due: {
      type: Date,
      required: [true, 'You must set a date that the payment is due']
    },
    paidOn: {
      type: Date
    },
    paid: {
      type: Boolean,
      default: true
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default models.Payment || model('Payment', paymentSchema);
