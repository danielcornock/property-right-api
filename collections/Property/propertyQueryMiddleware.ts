import { Schema } from 'mongoose';
import { INext } from '../../config/interfaces/IMiddlewareParams';

export class PropertyQueryMiddleware {
  private _propertySchema: Schema;

  constructor(propertySchema: Schema) {
    this._propertySchema = propertySchema;
    this._removeMapsUrlRoot();
  }

  private _removeMapsUrlRoot() {
    this._propertySchema.pre('save', function(this: any, next: INext) {
      console.log(this.url);
      this.url = this.url.replace('https://maps.google.com/', '');
      console.log(this.url);

      next();
    });
  }
}
