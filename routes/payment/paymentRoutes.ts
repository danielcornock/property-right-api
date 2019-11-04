import { GuardedRoutes } from '../abstract/guardedRoutes';
import PaymentController from '../../collections/Payment/paymentController';

class PaymentRoutes extends GuardedRoutes {
  private controller: PaymentController;

  constructor() {
    super();
    this.controller = new PaymentController();
    this._assignRoutes();
  }

  protected _assignRoutes() {
    this.router.get('/', (...args) => this.controller.getAllPayments(...args));

    this.router.post('/', (...args) => this.controller.createPayment(...args));

    this.router.get('/:paymentId', (...args) => this.controller.getPayment(...args));

    this.router.put('/:paymentId', (...args) => this.controller.updatePayment(...args));

    this.router.delete('/:paymentId', (...args) => this.controller.deletePayment(...args));
  }
}

export default new PaymentRoutes().routes;
