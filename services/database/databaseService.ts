import { Model } from 'mongoose';
import { AbstractDatabaseService } from './abstractDatabaseService';
import { CreateQuery, FetchQuery } from './interfaces/IQuery';

export default class DatabaseService<T> extends AbstractDatabaseService<T> {
  constructor(model: Model<any>) {
    super(model);
  }
}
