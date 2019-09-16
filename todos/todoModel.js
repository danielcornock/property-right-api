const mongoose = require('mongoose');
const validator = require('validator');

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'You must be logged in to create a todo!']
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: 'Property'
  },
  title: String,
  due: Date,
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

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
