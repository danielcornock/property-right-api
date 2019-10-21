import { IRequest, IResponse } from '../../config/interfaces/IMiddlewareParams';
import databaseService from '../../services/database/databaseService';
import { ITenant } from './interfaces/ITenant';
import responseService from '../../services/responseService';
import Property from '../Property/propertyModel';
import Tenant from './tenantModel';
import DatabaseService from '../../services/database/databaseService';

export class TenantController {
  private _tenantDataService: DatabaseService;
  private _propertyDataService: DatabaseService;
  contructor() {
    this._tenantDataService = new DatabaseService(Tenant);
    this._propertyDataService = new DatabaseService(Property);
  }

  public async getAllTenants(req: IRequest, res: IResponse): Promise<void> {
    let query: any = {};
    if (req.params.propertyId) {
      query.propertyId = req.params.propertyId;
    }

    const tenants: Array<ITenant> = await this._tenantDataService.findMany(req.user._id, query);

    responseService.successFind(res, { tenants: tenants });
  }

  public async getTenant(req: IRequest, res: IResponse): Promise<void> {
    const tenant: ITenant = await this._tenantDataService.findOne(req.user._id, { _id: req.params.tenantId });

    responseService.successFind(res, { tenant: tenant });
  }

  public async createTenant(req: IRequest, res: IResponse): Promise<void> {
    const tenant: ITenant = await this._tenantDataService.create(req.user._id, req.body);

    if (req.body.propertyId) {
      await this._propertyDataService.update(req.user._id, req.body.propertyId, {
        $push: { tenants: tenant._id }
      });
    }

    responseService.successCreate(res, { tenant: tenant });
  }

  public async deleteTenant(req: IRequest, res: IResponse): Promise<void> {
    await this._tenantDataService.delete(req.user._id, { id: req.params.tenantId });

    if (req.body.propertyId) {
      await this._propertyDataService.update(req.user._id, req.body.propertyId, {
        $pull: { tenants: req.params.tenantId }
      });
    }

    responseService.successDelete(res);
  }

  public async updateTenant(req: IRequest, res: IResponse): Promise<void> {
    const oldData: ITenant = await this._tenantDataService.findOne(req.user._id, {
      _id: req.params.tenantId
    });

    const newData: ITenant = await this._tenantDataService.update(
      req.user._id,
      req.params.tenantId,
      req.body
    );

    if (newData.propertyId !== oldData.propertyId) {
      await this._propertyDataService.update(req.user._id, req.body.propertyId, {
        $pull: { tenants: oldData._id },
        $push: { tenants: newData._id }
      });
    }

    responseService.successCreate(res, { tenant: newData });
  }
}
