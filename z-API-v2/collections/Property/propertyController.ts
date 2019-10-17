import {
  IRequest,
  IResponse
} from '../../../utilities/interfaces/IMiddlewareParams';
import Property from './Property';
import dbService from '../../services/databaseService';
import resService from '../../services/responseService';

export default class PropertyController {
  public async getAll(req: IRequest, res: IResponse) {
    const properties = await dbService.findMany(Property);
    resService.successFind(res, properties, 'properties');
  }
}
