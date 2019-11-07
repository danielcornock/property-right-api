import { IPayment } from './interfaces/IPayment';
import { paymentStatus } from './constants/paymentStatus';

class PaymentService {
  constructor() {}

  public isRecurringPayment(payment: IPayment, oldPayment: IPayment) {
    return payment.paid === true && payment.recurring == true && oldPayment.paid === false;
  }

  public sortPayments(payments: Array<IPayment>): Array<IPayment> {
    console.log(payments);
    return payments.sort((a, b): number => {
      // if (paymentStatus[a.status] < paymentStatus[b.status]) {
      if (a.due > b.due) {
        return -1;
      }
      // }
    });
  }
}

export default new PaymentService();
