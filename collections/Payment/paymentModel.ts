import mongoose, { Schema, model, models } from 'mongoose';
import { INext } from '../../config/interfaces/IMiddlewareParams';
import { IPayment } from './interfaces/IPayment';

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
    paid: {
      type: Boolean,
      default: false
    },
    recurring: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

paymentSchema.index({ property: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ tenant: 1 });

paymentSchema.virtual('status').get(function getStatus(this: any) {
  return this.paid ? 'paid' : this.due < Date.now() ? 'overdue' : 'due';
});

export default models.Payment || model('Payment', paymentSchema);
