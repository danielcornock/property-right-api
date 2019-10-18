import { Document, Schema } from 'mongoose';
import { INext } from '../../../utilities/interfaces/IMiddlewareParams';

export class PropertyMiddleware {
  private _propertySchema: Schema;
  constructor(propertySchema: Schema) {
    this._propertySchema = propertySchema;
    this._populateTenantInfo();
  }

  private _populateTenantInfo() {
    this._propertySchema.pre(/^find/ as any, function(
      this: Document,
      next: INext
    ) {
      // this.populate({
      //   path: 'tenants',
      //   select: 'name email phone avatar'
      // });

      next();
    });
  }
}
