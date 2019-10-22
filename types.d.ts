import { IUser } from './collections/User/interfaces/IUser';

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
