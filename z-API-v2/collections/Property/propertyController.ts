import { IRequest, IResponse } from '../../../utilities/interfaces/IMiddlewareParams';
import Property from './propertyModel';
import dbService from '../../services/database/dataDatabaseService';
import resService from '../../services/responseService';
import fileService from './../../services/fileService';

export default class PropertyController {
  constructor() {}

  public async getAllProperties(req: IRequest, res: IResponse): Promise<any> {
    const properties = await dbService.findMany(Property, req.user._id);

    resService.successFind(res, properties, 'properties');
  }

  public async getProperty(req: IRequest, res: IResponse): Promise<any> {
    const property = await dbService.findOne(Property, req.user._id, {
      _id: req.params.propertyId
    });

    resService.successFind(res, property, 'property');
  }

  public async createProperty(req: IRequest, res: IResponse): Promise<any> {
    req.body.image = await fileService.setImagePath(req);
    const property = await dbService.create(Property, req.user._id, req.body);

    resService.successCreate(res, property, 'property');
  }

  public async deleteProperty(req: IRequest, res: IResponse): Promise<any> {
    await dbService.delete(Property, req.user._id, {
      _id: req.params.propertyId
    });

    await dbService.deleteMany(Property, req.user._id, {
      propertyId: req.params.propertyId
    });

    resService.successDelete(res);
  }

  public async updateProperty(req: IRequest, res: IResponse): Promise<any> {
    if (req.file) req.body.image = await fileService.setImagePath(req);

    const updatedProperty = await dbService.update(Property, req.user._id, req.params.propertyId, req.body);

    resService.successCreate(res, updatedProperty, 'property');
  }
}
