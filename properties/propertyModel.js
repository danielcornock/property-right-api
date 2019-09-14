const mongoose = require('mongoose');
const validator = require('validator');

const propertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: String,
  monthlyRent: Number
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
