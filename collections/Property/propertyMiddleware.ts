import { Document, Schema } from 'mongoose';
import { INext } from '../../config/interfaces/IMiddlewareParams';
import DatabaseService from '../../services/database/databaseService';
import Todo from '../Todo/todoModel';

const _todoDataService: DatabaseService = new DatabaseService(Todo);

export class PropertyMiddleware {
  private _propertySchema: Schema;
  constructor(propertySchema: Schema) {
    this._propertySchema = propertySchema;
    this._populateTenantInfo();
  }

  private _populateTenantInfo() {
    console.log('hey');
    this._propertySchema.pre(/^find/ as any, function(this: Document, next: INext) {
      this.populate({
        path: 'tenants',
        select: 'name email phone avatar'
      });
      next();
    });
  }
}
