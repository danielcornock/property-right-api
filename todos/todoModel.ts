import Property, { IPropertyDocument } from './../properties/propertyModel';

import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import { INext } from '../utilities/interfaces/IMiddlewareParams';
import * as databaseService from './../services/databaseService';

export interface ITodoDocument extends Document {
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
      message: 'Difficulty must be either easy, medium or difficult'
    },
    required: false
  },
  completed: {
    type: Boolean,
    default: false
  }
});

todoSchema.pre('save', async function(this: ITodoDocument, next: INext) {
  if (this.propertyId) {
    const property: IPropertyDocument = await databaseService.findById(
      Property,
      this.propertyId
    );
    this.propertyName = property.name;
  }

  next();
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
