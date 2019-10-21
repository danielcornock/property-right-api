import { AbstractDatabaseService } from './abstractDatabaseService';
import { Model } from 'mongoose';

export default class UserDatabaseService extends AbstractDatabaseService {
  constructor(model: Model<any>) {
    super(model);
  }

  public async findOne(data: any): Promise<any> {
    return await this._model.findOne(data).select('+password');
  }

  public async create(data: any): Promise<any> {
    return await this._model.create(data);
  }
}
