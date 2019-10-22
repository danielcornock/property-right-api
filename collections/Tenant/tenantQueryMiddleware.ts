import { Schema, Model, Document } from 'mongoose';
import databaseService from '../../services/database/databaseService';
import Property from '../Property/propertyModel';
import { INext } from '../../config/interfaces/IMiddlewareParams';
import DatabaseService from '../../services/database/databaseService';

export class TenantQueryMiddleware {
  private readonly _tenantSchema: Schema;
  private readonly _propertyDataService: DatabaseService;

  constructor(tenantSchema: Schema) {
    this._tenantSchema = tenantSchema;
    this._propertyDataService = new DatabaseService(Property);
    this._setPropertyNameFromId();
    this._setAvatarDetails();
  }

  private _setPropertyNameFromId() {
    this._tenantSchema.pre('save', async function setPropertyName(this: any, next: INext) {
      if (this.propertyId) {
        this.propertyName = await this._propertyDataService.findOne('', { propertyId: this.propertyId });
      }

      next();
    });
  }

  private _setAvatarDetails() {
    this._tenantSchema.pre('save', async function setAvatarDetails(this: any, next: INext) {
      const hue = Math.floor(Math.random() * (360 - 0)) + 0;
      this.avatar.bgColor = `hsl(${hue}, 58%, 76%)`;
      this.avatar.textColor = `hsl(${hue}, 58%, 20%)`;

      next();
    });
  }
}
