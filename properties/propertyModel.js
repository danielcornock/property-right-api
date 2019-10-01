const mongoose = require('mongoose');
const validator = require('validator');

const propertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'You must be logged in to post a property.']
  },
  name: String,
  monthlyRent: Number,
  image: String,
  tenants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tenant'
    }
  ]
});

propertySchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tenants',
    select: 'name email phone avatar'
  });
  next();
});
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
