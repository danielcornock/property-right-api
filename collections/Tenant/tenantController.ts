import { IRequest, IResponse } from '../../config/interfaces/IMiddlewareParams';
import { ITenant } from './interfaces/ITenant';
import responseService from '../../services/responseService';
import Tenant from './tenantModel';
import DatabaseService from '../../services/database/databaseService';

const _tenantDataService: DatabaseService = new DatabaseService(Tenant);

export class TenantController {
  contructor() {}

  public async getAllTenants(req: IRequest, res: IResponse): Promise<void> {
    let query: any = {};
    if (req.params.propertyId) {
      query.propertyId = req.params.propertyId;
    }

    const tenants: Array<ITenant> = await _tenantDataService.findMany(req.user._id, query);

    responseService.successFind(res, { tenants: tenants });
  }

  public async getTenant(req: IRequest, res: IResponse): Promise<void> {
    const tenant = await _tenantDataService.findOne(req.user._id, { _id: req.params.tenantId });

    responseService.successFind(res, { tenant: tenant });
  }

  public async createTenant(req: IRequest, res: IResponse): Promise<void> {
    const tenant: ITenant = await _tenantDataService.create(req.user._id, req.body);

    responseService.successCreate(res, { tenant: tenant });
  }

  public async deleteTenant(req: IRequest, res: IResponse): Promise<void> {
    await _tenantDataService.deleteOne(req.user._id, { _id: req.params.tenantId });

    responseService.successDelete(res);
  }

  public async updateTenant(req: IRequest, res: IResponse): Promise<void> {
    const tenant: any = await _tenantDataService.update(req.user._id, req.params.tenantId, req.body);

    responseService.successCreate(res, { tenant: tenant });
  }
}
