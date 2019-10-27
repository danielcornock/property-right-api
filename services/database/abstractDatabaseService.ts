import { Model, DocumentQuery, Query, Aggregate } from 'mongoose';
import { CreateQuery, FetchQuery } from './interfaces/IQuery';

export abstract class AbstractDatabaseService {
  protected _model: Model<any>;
  constructor(model: Model<any>) {
    this._model = model;
  }

  public findOne(userId: string, params: FetchQuery): DocumentQuery<any[], any, {}> {
    params = this._setUser(params, userId);
    return this._model.findOne(params);
  }

  public findMany(userId: string, params: FetchQuery = {}): DocumentQuery<any[], any, {}> {
    params = this._setUser(params, userId);
    return this._model.find(params);
  }

  public create(userId: string, data: any): Promise<any> {
    data = this._setUser(data, userId);
    return this._model.create(data);
  }

  public deleteOne(
    userId: string,
    query: FetchQuery
  ): Query<{ ok?: number; n?: number } & { deletedCount?: number }> {
    query = this._setUser(query, userId);
    return this._model.deleteOne(query);
  }

  public deleteMany(
    userId: string,
    query: FetchQuery
  ): Query<{ ok?: number; n?: number } & { deletedCount?: number }> {
    query = this._setUser(query, userId);
    return this._model.deleteMany(query);
  }

  public update(userId: string, docId: string, data: any): DocumentQuery<any[], any, {}> {
    const query = {
      _id: docId,
      user: userId
    };
    return this._model.findOneAndUpdate(query, data);
  }

  public aggregate(aggregation: Array<any>): Aggregate<any[]> {
    return this._model.aggregate(aggregation);
  }

  private _setUser(params: any, userId: string): FetchQuery {
    if (userId) {
      params.user = userId;
    }
    return params;
  }
}
