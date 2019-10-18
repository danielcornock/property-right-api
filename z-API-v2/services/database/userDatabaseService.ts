import { DatabaseService } from './databaseService';
import { Model } from 'mongoose';
import User from '../../collections/User/userModel';

class UserDatabaseService extends DatabaseService {
  constructor() {
    super();
  }

  public async findOne(data: any): Promise<any> {
    return await User.findOne(data).select('+password');
  }

  public async create(data: any): Promise<any> {
    return await User.create(data);
  }
}

export default new UserDatabaseService();
