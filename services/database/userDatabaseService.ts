import { AbstractDatabaseService } from './abstractDatabaseService';
import { Model } from 'mongoose';

export default class UserDatabaseService extends AbstractDatabaseService<any> {
  constructor(model: Model<any>) {
    super(model);
  }
}
