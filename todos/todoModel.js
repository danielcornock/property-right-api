const Property = require('./../properties/propertyModel');

const mongoose = require('mongoose');
const validator = require('validator');

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'You must be logged in to create a todo!']
  },
  propertyId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Property'
  },
  propertyName: String,
  title: String,
  date: String,
  severity: {
    type: String,
    enum: {
      values: ['easy', 'moderate', 'severe', ''],
      message: 'Difficulty must be either easy, medium or difficult'
    },
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  }
});

todoSchema.pre('save', async function(next) {
  if (this.propertyId) {
    const { name } = await Property.findById(this.propertyId);
    this.propertyName = name;
  }

  next();
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
