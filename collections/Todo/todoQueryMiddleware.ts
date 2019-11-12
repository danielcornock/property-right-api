import { Schema } from 'mongoose';

export class TodoQueryMiddleware {
  private readonly _todoSchema: Schema;

  constructor(todoSchema: Schema) {
    this._todoSchema = todoSchema;
  }
}
