export interface IPayment {
  _id: string;
  property: string;
  user: string;
  tenant: string;
  amount: number;
  paid: boolean;
  recurring: boolean;
  due: Date;
  status?: string;
}
