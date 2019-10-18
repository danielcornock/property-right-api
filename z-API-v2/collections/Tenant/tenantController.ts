import { IRequest, IResponse } from '../../../utilities/interfaces/IMiddlewareParams';
import databaseService from '../../services/database/dataDatabaseService';
import { ITenant } from './interfaces/ITenant';
import responseService from '../../services/responseService';
import Property from '../../../properties/propertyModel';
import Tenant from '../../../tenants/tenantModel';

export class TenantController {
  contructor() {}

  public async getAllTenants(req: IRequest, res: IResponse): Promise<any> {
    const tenants: Array<ITenant> = await databaseService.findMany(Tenant, req.user._id, {
      propertyId: req.params.propertyId
    });

    responseService.successFind(res, tenants, 'tenants');
  }

  public async getTenant(req: IRequest, res: IResponse): Promise<any> {
    const tenant: ITenant = await databaseService.findOne(Tenant, req.user._id, { _id: req.params.tenantId });

    responseService.successFind(res, tenant, 'tenant');
  }

  public async createTenant(req: IRequest, res: IResponse): Promise<any> {
    const tenant: ITenant = await databaseService.create(Tenant, req.user._id, req.body);

    if (req.body.propertyId) {
      await databaseService.update(Property, req.user._id, req.body.propertyId, {
        $push: { tenants: tenant._id }
      });
    }

    responseService.successCreate(res, tenant, 'tenant');
  }

  public async deleteTenant(req: IRequest, res: IResponse): Promise<any> {
    await databaseService.delete(Tenant, req.user._id, { id: req.params.tenantId });

    if (req.body.propertyId) {
      await databaseService.update(Property, req.user._id, req.body.propertyId, {
        $pull: { tenants: req.params.tenantId }
      });
    }

    responseService.successDelete(res);
  }

  public async updateTenant(req: IRequest, res: IResponse): Promise<any> {
    const oldData: ITenant = await databaseService.findOne(Tenant, req.user._id, {
      _id: req.params.tenantId
    });

    const newData: ITenant = await databaseService.update(
      Tenant,
      req.user._id,
      req.params.tenantId,
      req.body
    );

    if (newData.propertyId !== oldData.propertyId) {
      await databaseService.update(Property, req.user._id, req.body.propertyId, {
        $pull: { tenants: oldData._id },
        $push: { tenants: newData._id }
      });
    }

    responseService.successCreate(res, newData, 'tenant');
  }
}
