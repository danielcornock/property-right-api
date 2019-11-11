import DatabaseService from '../../services/database/databaseService';
import Payment from './paymentModel';
import { IRequest, IResponse, INext } from '../../config/interfaces/IMiddlewareParams';
import resService from '../../services/responseService';
import paymentService from './paymentService';
import queryService from '../../services/queryService';
import { IPayment } from './interfaces/IPayment';
import { DocumentQuery } from 'mongoose';

export default class PaymentController {
  private _paymentDataService: DatabaseService<IPayment>;

  constructor() {
    this._paymentDataService = new DatabaseService(Payment);
  }

  public async getAllPayments(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const query = queryService.buildParamQuery(req.params);

      let payments: DocumentQuery<IPayment[], any, {}> = this._paymentDataService
        .findMany(req.user._id, query)
        .sort({ due: -1 });

      if (req.params.propertyId) {
        payments.populate({ path: 'tenant', select: 'name' });
      } else if (Object.entries(req.params).length === 0 && req.params.constructor === Object) {
        payments.populate({ path: 'tenant', select: 'name' }).populate({ path: 'property', select: 'name' });
      }

      const paymentsRes: Array<IPayment> = await payments;

      resService.successFind(res, { payments: paymentsRes });
    } catch (e) {
      return next(e);
    }
  }

  public async createPayment(req: IRequest, res: IResponse, next: INext): Promise<void> {
    console.log(req.body);
    try {
      const payment: IPayment = await this._paymentDataService.create(req.user._id, req.body);
      console.log(payment.user);
      resService.successCreate(res, { payment: payment });
    } catch (e) {
      return next(e);
    }
  }

  public async getPayment(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const payment: IPayment = await this._paymentDataService.findOne(req.user._id, {
        _id: req.params.paymentId
      });

      resService.successFind(res, { payment: payment });
    } catch (e) {
      return next(e);
    }
  }

  public async updatePayment(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      const [payment, oldPayment]: Array<IPayment> = await this._paymentDataService.update(
        req.user._id,
        { _id: req.params.paymentId },
        req.body
      );

      if (paymentService.isRecurringPayment(payment, oldPayment)) {
        oldPayment._id = null;
        oldPayment.due = new Date(oldPayment.due);
        oldPayment.due.setMonth(oldPayment.due.getMonth() + 1);
        await this._paymentDataService.create(req.user._id, oldPayment);
      }

      resService.successCreate(res, { payment: payment });
    } catch (e) {
      return next(e);
    }
  }

  public async deletePayment(req: IRequest, res: IResponse, next: INext): Promise<void> {
    try {
      await this._paymentDataService.deleteOne(req.user._id, { _id: req.params.paymentId });

      resService.successDelete(res);
    } catch (e) {
      return next(e);
    }
  }
}
