import { IRequest, IResponse, INext } from '../../config/interfaces/IMiddlewareParams';
import resService from '../../services/responseService';
import fileService from './../../services/fileService';
import Property from './propertyModel';
import DatabaseService from '../../services/database/databaseService';
import Todo from '../Todo/todoModel';
import { Error } from 'mongoose';
import propertyService from './propertyService';

const _propertyDataService: DatabaseService = new DatabaseService(Property);
const _todoDataService: DatabaseService = new DatabaseService(Todo);

export default class PropertyController {
  constructor() {}

  public async getAllProperties(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const properties = await _propertyDataService
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
    try {
      const property = await _propertyDataService.findOne(req.user._id, {
        _id: req.params.propertyId
      });
      resService.successFind(res, { property: property });
    } catch (e) {
      return next(new Error('Cannot fetch property'));
    }
  }

  public async createProperty(req: IRequest, res: IResponse): Promise<void> {
    req.body.image = await fileService.setImagePath(req);
    const property = await _propertyDataService.create(req.user._id, req.body);
    resService.successCreate(res, { property: property });
  }

  public async deleteProperty(req: IRequest, res: IResponse): Promise<void> {
    await _propertyDataService.delete(req.user._id, {
      _id: req.params.propertyId
    });

    await _todoDataService.deleteMany(req.user._id, {
      propertyId: req.params.propertyId
    });

    resService.successDelete(res);
  }

  public async updateProperty(req: IRequest, res: IResponse): Promise<void> {
    if (req.file) req.body.image = await fileService.setImagePath(req);

    const updatedProperty = await _propertyDataService.update(req.user._id, req.params.propertyId, req.body);

    resService.successCreate(res, { property: updatedProperty });
  }
}
