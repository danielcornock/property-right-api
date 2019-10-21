import { GuardedRoutes } from '../abstract/guardedRoutes';
import { TenantController } from './../../collections/Tenant/tenantController';

class TenantRoutes extends GuardedRoutes {
  private controller: TenantController;

  constructor() {
    super();
    this.controller = new TenantController();
    this._assignRoutes();
  }

  protected _assignRoutes(): void {
    this.router.get('/', this.controller.getAllTenants);

    this.router.post('/', this.controller.createTenant);

    this.router.get('/:tenantId', this.controller.getTenant);

    this.router.put('/:tenantId', this.controller.updateTenant);

    this.router.delete('/:tenantId', this.controller.deleteTenant);
  }
}

export default new TenantRoutes().routes;
