import { IRequest, IResponse, INext } from '../../config/interfaces/IMiddlewareParams';
import { ITenant } from './interfaces/ITenant';
import responseService from '../../services/responseService';
import Tenant from './tenantModel';
import DatabaseService from '../../services/database/databaseService';

export class TenantController {
  private _tenantDataService: DatabaseService;

  contructor() {
    this._tenantDataService = new DatabaseService(Tenant);
  }

  public async getAllTenants(req: IRequest, res: IResponse, next: INext): Promise<void> {
    let query: any = {};
    if (req.params.propertyId) {
      query.propertyId = req.params.propertyId;
    }

    const tenants: Array<ITenant> = await this._tenantDataService.findMany(req.user._id, query);

    responseService.successFind(res, { tenants: tenants });
  }

  public async getTenant(req: IRequest, res: IResponse, next: INext): Promise<void> {
    const tenant = await this._tenantDataService.findOne(req.user._id, { _id: req.params.tenantId });

    responseService.successFind(res, { tenant: tenant });
  }

  public async createTenant(req: IRequest, res: IResponse, next: INext): Promise<void> {
    const tenant: ITenant = await this._tenantDataService.create(req.user._id, req.body);

    responseService.successCreate(res, { tenant: tenant });
  }

  public async deleteTenant(req: IRequest, res: IResponse, next: INext): Promise<void> {
    await this._tenantDataService.deleteOne(req.user._id, { _id: req.params.tenantId });

    responseService.successDelete(res);
  }

  public async updateTenant(req: IRequest, res: IResponse, next: INext): Promise<void> {
    const tenant: any = await this._tenantDataService.update(req.user._id, req.params.tenantId, req.body);

    responseService.successCreate(res, { tenant: tenant });
  }
}
