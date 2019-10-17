import { Model } from 'mongoose';

class DatabaseService {
  public async findMany(
    Model: Model<any>,
    params: object = {}
  ): Promise<Array<object>> {
    return Model.find(params);
  }

  public async findOne(Model: Model<any>, data: object): Promise<object> {
    return await Model.find(data);
  }

  public async findUser(Model: Model<any>, data: object): Promise<object> {
    return await Model.findOne(data).select('+password');
  }

  public async findById(Model: Model<any>, docId: string): Promise<object> {
    return await Model.findById(docId);
  }

  public async create(Model: Model<any>, data: object): Promise<object> {
    return await Model.create(data);
  }
}

export default new DatabaseService();
