import { GuardedRoutes } from '../abstract/guardedRoutes';
import { TenantController } from './../../collections/Tenant/tenantController';
import paymentRoutes from '../payment/paymentRoutes';

class TenantRoutes extends GuardedRoutes {
  private controller: TenantController;

  constructor() {
    super();
    this.controller = new TenantController();
    this._assignRoutes();
    this._useExtenalRoutes();
  }

  protected _assignRoutes(): void {
    this.router.get('/', (...args) => this.controller.getAllTenants(...args));

    this.router.post('/', (...args) => this.controller.createTenant(...args));

    this.router.get('/:tenantId', (...args) => this.controller.getTenant(...args));

    this.router.put('/:tenantId', (...args) => this.controller.updateTenant(...args));

    this.router.delete('/:tenantId', (...args) => this.controller.deleteTenant(...args));
  }

  private _useExtenalRoutes() {
    this.router.use('/:propertyId/payments', paymentRoutes);
  }
}

export default new TenantRoutes().routes;
