import { IRequest, IResponse, INext } from '../../config/interfaces/IMiddlewareParams';
import resService from '../../services/responseService';
import fileService from './../../services/fileService';
import Property from './propertyModel';
import DatabaseService from '../../services/database/databaseService';
import Todo from '../Todo/todoModel';
import Tenant from '../Tenant/tenantModel';
import { Error } from 'mongoose';

export default class PropertyController {
  private _propertyDataService: DatabaseService;
  private _todoDataService: DatabaseService;
  private _tenantDataService: DatabaseService;

  constructor() {
    this._propertyDataService = new DatabaseService(Property);
    this._todoDataService = new DatabaseService(Todo);
    this._tenantDataService = new DatabaseService(Tenant);
  }

  public async getAllProperties(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const properties = await this._propertyDataService
        .findMany(req.user._id)
        .populate('todoCount')
        .populate('tenants')
        .exec();

      resService.successFind(res, { properties: properties });
    } catch (e) {
      return next(new Error('Cannot fetch properties'));
    }
  }

  public async getProperty(req: IRequest, res: IResponse, next: INext): Promise<void> {
    console.log(this);
    try {
      const property = await this._propertyDataService.findOne(req.user._id, {
        _id: req.params.propertyId
      });
      resService.successFind(res, { property: property });
    } catch (e) {
      return next(new Error('Cannot fetch property'));
    }
  }

  public async createProperty(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      req.body.image = await fileService.setImagePath(req);
      const property = await this._propertyDataService.create(req.user._id, req.body);
      resService.successCreate(res, { property: property });
    } catch (e) {
      return next(new Error('Cannot create property.'));
    }
  }

  public async deleteProperty(req: IRequest, res: IResponse, next: INext): Promise<void> {
    await this._propertyDataService.deleteOne(req.user._id, {
      _id: req.params.propertyId
    });

    await this._todoDataService.deleteMany(req.user._id, {
      propertyId: req.params.propertyId
    });

    await this._tenantDataService.deleteMany(req.user._id, {
      propertyId: req.params.propertyId
    });

    resService.successDelete(res);
  }

  public async updateProperty(req: IRequest, res: IResponse, next: INext): Promise<void> {
    if (req.file) req.body.image = await fileService.setImagePath(req);

    const updatedProperty = await this._propertyDataService.update(
      req.user._id,
      req.params.propertyId,
      req.body
    );

    resService.successCreate(res, { property: updatedProperty });
  }
}
