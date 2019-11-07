import DatabaseService from '../../services/database/databaseService';
import Payment from './paymentModel';
import { IRequest, IResponse, INext } from '../../config/interfaces/IMiddlewareParams';
import resService from '../../services/responseService';
import paymentService from './paymentService';
import queryService from '../../services/queryService';

export default class PaymentController {
  private _paymentDataService: DatabaseService;

  constructor() {
    this._paymentDataService = new DatabaseService(Payment);
  }

  public async getAllPayments(req: IRequest, res: IResponse, next: INext) {
    try {
      const query = queryService.buildParamQuery(req.params);

      let payments = await this._paymentDataService.findMany(req.user._id, query).sort({ due: -1 });

      // payments = paymentService.sortPayments(payments);

      resService.successFind(res, { payments: payments });
    } catch (e) {
      return next(e);
    }
  }

  public async createPayment(req: IRequest, res: IResponse, next: INext) {
    console.log(req.body);
    try {
      const payment = await this._paymentDataService.create(req.user._id, req.body);
      resService.successCreate(res, { payment: payment });
    } catch (e) {
      return next(e);
    }
  }

  public async getPayment(req: IRequest, res: IResponse, next: INext) {
    try {
      const payment = await this._paymentDataService.findOne(req.user._id, { _id: req.params.paymentId });
    } catch (e) {
      return next(e);
    }
  }

  public async updatePayment(req: IRequest, res: IResponse, next: INext) {
    try {
      const [payment, oldPayment] = await this._paymentDataService.update(
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

  public async deletePayment(req: IRequest, res: IResponse, next: INext) {
    try {
      await this._paymentDataService.deleteOne(req.user._id, { _id: req.params.paymentId });

      resService.successDelete(res);
    } catch (e) {
      return next(e);
    }
  }
}
