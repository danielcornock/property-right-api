import { IRequest, IResponse } from '../../config/interfaces/IMiddlewareParams';
import databaseService from '../../services/database/databaseService';
import { ITenant } from './interfaces/ITenant';
import responseService from '../../services/responseService';
import Property from '../Property/propertyModel';
import Tenant from './tenantModel';
import DatabaseService from '../../services/database/databaseService';

const _tenantDataService: DatabaseService = new DatabaseService(Tenant);
const _propertyDataService: DatabaseService = new DatabaseService(Property);

export class TenantController {
  contructor() {}

  public async getAllTenants(req: IRequest, res: IResponse): Promise<void> {
    let query: any = {};
    if (req.params.propertyId) {
      query.propertyId = req.params.propertyId;
    }

    const tenants: Array<ITenant> = await _tenantDataService
      .findMany(req.user._id, query)
      .populate('todoCount');

    responseService.successFind(res, { tenants: tenants });
  }

  public async getTenant(req: IRequest, res: IResponse): Promise<void> {
    const tenant = await _tenantDataService.findOne(req.user._id, { _id: req.params.tenantId });

    responseService.successFind(res, { tenant: tenant });
  }

  public async createTenant(req: IRequest, res: IResponse): Promise<void> {
    const tenant: ITenant = await _tenantDataService.create(req.user._id, req.body);

    if (req.body.propertyId) {
      await _propertyDataService.update(req.user._id, req.body.propertyId, {
        $push: { tenants: tenant._id }
      });
    }

    responseService.successCreate(res, { tenant: tenant });
  }

  public async deleteTenant(req: IRequest, res: IResponse): Promise<void> {
    await _tenantDataService.delete(req.user._id, { id: req.params.tenantId });

    if (req.body.propertyId) {
      await _propertyDataService.update(req.user._id, req.body.propertyId, {
        $pull: { tenants: req.params.tenantId }
      });
    }

    responseService.successDelete(res);
  }

  public async updateTenant(req: IRequest, res: IResponse): Promise<void> {
    const oldData: any = await _tenantDataService.findOne(req.user._id, {
      _id: req.params.tenantId
    });

    const newData: any = await _tenantDataService.update(req.user._id, req.params.tenantId, req.body);

    if (newData.propertyId !== oldData.propertyId) {
      await _propertyDataService.update(req.user._id, req.body.propertyId, {
        $pull: { tenants: oldData._id },
        $push: { tenants: newData._id }
      });
    }

    responseService.successCreate(res, { tenant: newData });
  }
}
