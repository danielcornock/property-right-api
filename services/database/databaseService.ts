import { Model } from 'mongoose';
import { AbstractDatabaseService } from './abstractDatabaseService';
import { CreateQuery, FetchQuery } from './interfaces/IQuery';

export default class DatabaseService extends AbstractDatabaseService {
  constructor(model: Model<any>) {
    super(model);
  }
}
