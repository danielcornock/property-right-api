import PropertyController from '../../collections/Property/propertyController';
import fileService from '../../services/fileService';
import { GuardedRoutes } from '../abstract/guardedRoutes';
import tenantRoutes from '../tenant/tenantRoutes';
import todoRoutes from '../todo/todoRoutes';
import paymentRoutes from '../payment/paymentRoutes';

class PropertyRoutes extends GuardedRoutes {
  private controller: PropertyController;

  constructor() {
    super();
    this.controller = new PropertyController();
    this._assignRoutes();
    this._useExternalRoutes();
  }

  protected _assignRoutes() {
    this.router.get('/', (...args) => this.controller.getAllProperties(...args));

    this.router.post('/', fileService.multer().single('image'), (...args) =>
      this.controller.createProperty(...args)
    );

    this.router.get('/:propertyId', (...args) => this.controller.getProperty(...args));

    this.router.delete('/:propertyId', (...args) => this.controller.deleteProperty(...args));

    this.router.put('/:propertyId', fileService.multer().single('image'), (...args) =>
      this.controller.updateProperty(...args)
    );
  }

  private _useExternalRoutes(): void {
    this.router.use('/:propertyId/todos', todoRoutes);

    this.router.use('/:propertyId/tenants', tenantRoutes);

    this.router.use('/:propertyId/payments', paymentRoutes);
  }
}

export default new PropertyRoutes().routes;
