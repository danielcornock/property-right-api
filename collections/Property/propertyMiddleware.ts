import { Schema } from 'mongoose';

export class PropertyMiddleware {
  private _propertySchema: Schema;
  constructor(propertySchema: Schema) {
    this._propertySchema = propertySchema;
  }
}
