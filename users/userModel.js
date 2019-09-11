const mongoose = require('mongoose');
const validator = require('validator');
const authMiddleware = require('./authMiddleware');
const userMethods = require('./userMethods');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name, so we know what to call you!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'You must enter an email address!'],
    unique: [true, 'Sorry, that email address already exists!'],
    lowercase: true,
    trim: true,
    validate: [
      validator.isEmail,
      "Hmm, it seems like that email address isn't valid!"
    ]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'You must enter a password'],
    minlength: 8,
    select: false // Password will not output
  }
});

authMiddleware.hashPassword(userSchema);
userMethods.checkPasswordMatch(userSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;
