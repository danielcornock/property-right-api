import { Model } from 'mongoose';
import { AbstractDatabaseService } from './abstractDatabaseService';
import { CreateQuery, FetchQuery } from './interfaces/IQuery';

export default class DatabaseService extends AbstractDatabaseService {
  constructor(model: Model<any>) {
    super(model);
  }

  public async findMany(userId: string, params: FetchQuery = {}): Promise<any> {
    console.log('hi');
    params = this._setUser(params, userId);
    return await this._model.find(params);
  }
}
