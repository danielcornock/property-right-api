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
  imagePath: String
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
