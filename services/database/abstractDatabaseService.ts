import { Model } from 'mongoose';
import { CreateQuery, FetchQuery } from './interfaces/IQuery';

export abstract class AbstractDatabaseService {
  protected _model: Model<any>;
  constructor(model: Model<any>) {
    this._model = model;
  }

  public async findOne(userId: string, params: FetchQuery): Promise<any> {
    params = this._setUser(params, userId);
    return await this._model.find(params);
  }

  public async findMany(userId: string, params: FetchQuery = {}): Promise<any> {
    params = this._setUser(params, userId);
    return await this._model.find(params);
  }

  public async create(userId: string, data: any): Promise<any> {
    data = this._setUser(data, userId);
    return await this._model.create(data);
  }

  public async delete(userId: string, query: FetchQuery): Promise<any> {
    query = this._setUser(query, userId);
    return await this._model.deleteOne(query);
  }

  public async deleteMany(userId: string, query: FetchQuery): Promise<any> {
    query = this._setUser(query, userId);
    return await this._model.deleteMany(query);
  }

  public async update(userId: string, docId: string, data: any): Promise<any> {
    const query = {
      _id: docId,
      user: userId
    };
    return await this._model.findByIdAndUpdate(query, data);
  }

  public async aggregate(aggregation: Array<any>) {
    return this._model.aggregate(aggregation);
  }

  protected _setUser(params: any, userId: string): FetchQuery {
    params.user = userId;
    return params;
  }
}
