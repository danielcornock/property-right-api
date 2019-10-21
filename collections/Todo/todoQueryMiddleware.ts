import { Schema } from 'mongoose';
import Property from '../../deprecated/properties/propertyModel';
import { INext } from '../../config/interfaces/IMiddlewareParams';
import DatabaseService from '../../services/database/databaseService';

export class TodoQueryMiddleware {
  private readonly _todoSchema: Schema;
  private readonly _propertyDataService: DatabaseService;

  constructor(todoSchema: Schema) {
    this._propertyDataService = new DatabaseService(Property);
    this._todoSchema = todoSchema;
  }

  public async fetchPropertyName() {
    this._todoSchema.pre('save', async function(this: any, next: INext) {
      if (this.propertyId) {
        const property = await this._propertyDataService.findOne('', { _id: this.propertyId });
        this.propertyName = property.name;
      }

      next();
    });
  }
}
