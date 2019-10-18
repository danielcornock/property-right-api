import { Model } from 'mongoose';
import { CreateQuery, FetchQuery } from './interfaces/IQuery';

export abstract class DatabaseService {
  constructor() {}

  public async findOne(Model: Model<any>, userId: string, params: FetchQuery): Promise<any> {
    params = this._setUser(params, userId);
    return await Model.find(params);
  }

  public async findMany(Model: Model<any>, userId: string, params: FetchQuery = {}): Promise<any> {
    params = this._setUser(params, userId);
    return Model.find(params);
  }

  public async create(Model: Model<any>, userId: string, data: any): Promise<any> {
    data = this._setUser(data, userId);
    return await Model.create(data);
  }

  public async delete(Model: Model<any>, userId: string, query: FetchQuery): Promise<any> {
    query = this._setUser(query, userId);
    return await Model.deleteOne(query);
  }

  public async deleteMany(Model: Model<any>, userId: string, query: FetchQuery): Promise<any> {
    query = this._setUser(query, userId);
    return await Model.deleteMany(query);
  }

  public async update(Model: Model<any>, userId: string, docId: string, data: any): Promise<any> {
    const query = {
      _id: docId,
      user: userId
    };
    return await Model.findByIdAndUpdate(query, data);
  }

  private _setUser(params: any, userId: string): object {
    params.user = userId;
    return params;
  }
}
