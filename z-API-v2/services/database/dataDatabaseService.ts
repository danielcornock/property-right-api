import { Model } from 'mongoose';
import { DatabaseService } from './databaseService';

class DataDatabaseService extends DatabaseService {
  constructor() {
    super();
  }
}

export default new DataDatabaseService();
