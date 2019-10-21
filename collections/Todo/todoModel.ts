import mongoose, { Document, Schema, models, model } from 'mongoose';
import validator from 'validator';
import { TodoQueryMiddleware } from './todoQueryMiddleware';

export interface ITodo extends Document {
  user: Schema.Types.ObjectId | string;
  propertyId: string;
  propertyName: string;
  title: string;
  date: string;
  severity: string;
  completed: boolean;
}

const todoSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You must be logged in to create a todo!']
  },
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  propertyName: String,
  title: String,
  date: Date,
  severity: {
    type: String,
    enum: {
      values: ['easy', 'moderate', 'severe', ''],
      message: 'Difficulty must be either easy, moderate or severe'
    },
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  }
});

new TodoQueryMiddleware(todoSchema);

export default models.Todo || model('Todo', todoSchema);
