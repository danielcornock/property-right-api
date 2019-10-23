import { Schema } from 'mongoose';
import Property from '../../collections/Property/propertyModel';
import { INext } from '../../config/interfaces/IMiddlewareParams';
import DatabaseService from '../../services/database/databaseService';

const _propertyDataService: DatabaseService = new DatabaseService(Property);
export class TodoQueryMiddleware {
  private readonly _todoSchema: Schema;

  constructor(todoSchema: Schema) {
    this._todoSchema = todoSchema;
    this._fetchPropertyName();
  }

  private async _fetchPropertyName() {
    this._todoSchema.pre('save', async function(this: any, next: INext) {
      if (this.propertyId) {
        const property: any = await _propertyDataService.findOne('', { _id: this.propertyId });
        this.propertyName = property.name;
        console.log(property.name);
      }

      next();
    });
  }
}
